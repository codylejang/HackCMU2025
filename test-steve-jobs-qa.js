// Simplified test for Steve Jobs book upload and Q&A functionality
// Tests the question: "How is Steve Jobs and Elon Musk different and similar in handling difficult situations?"

const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testSteveJobsQA() {
    console.log('🧪 Testing Steve Jobs Book Upload & Q&A Integration');
    console.log('=' * 60);

    const frontendUrl = 'http://localhost:3001';
    const openNotebookUrl = 'http://localhost:5055';
    const assetsDir = './assets';

    try {
        // Step 1: Check services and get available models
        console.log('📡 Checking services and models...');

        const modelsResponse = await fetch(`${openNotebookUrl}/api/models`);
        const models = await modelsResponse.json();

        const chatModel = models.find(m => m.type === 'language');
        const embeddingModel = models.find(m => m.type === 'embedding');

        if (!chatModel || !embeddingModel) {
            console.log('❌ Required models not found');
            console.log('Available models:', models.map(m => `${m.name} (${m.type})`).join(', '));
            return;
        }

        console.log('✅ Models found:');
        console.log(`   Chat: ${chatModel.name}`);
        console.log(`   Embedding: ${embeddingModel.name}`);

        // Step 2: Upload Steve Jobs book
        console.log('\n📚 Uploading Steve Jobs biography...');

        const steveJobsPath = path.join(assetsDir, '01_Steve_Jobs.pdf');

        if (!fs.existsSync(steveJobsPath)) {
            console.log(`❌ Steve Jobs book not found at: ${steveJobsPath}`);
            return;
        }

        const form = new FormData();
        form.append('file', fs.createReadStream(steveJobsPath));
        form.append('author', 'Walter Isaacson');

        const uploadResponse = await fetch(`${frontendUrl}/api/books`, {
            method: 'POST',
            body: form
        });

        const uploadResult = await uploadResponse.json();

        if (!uploadResult.success) {
            console.log('❌ Upload failed:', uploadResult.error);
            return;
        }

        const book = uploadResult.data;
        const openNotebook = uploadResult.openNotebook;

        console.log('✅ Book uploaded successfully:');
        console.log(`   Title: ${book.title}`);
        console.log(`   ID: ${book.id}`);
        console.log(`   Size: ${(book.fileSize / 1024 / 1024).toFixed(2)} MB`);
        console.log(`   Notebook ID: ${openNotebook?.notebookId || 'Not created'}`);
        console.log(`   Source ID: ${openNotebook?.sourceId || 'Not created'}`);

        if (!openNotebook?.connected) {
            console.log('⚠️ Open Notebook integration not working');
            return;
        }

        // Step 3: Wait for processing
        console.log('\n⏳ Waiting for book processing...');
        await new Promise(resolve => setTimeout(resolve, 8000));

        // Step 4: Test the specific leadership question
        console.log('\n🤖 Testing Q&A with leadership comparison question...');

        const targetQuestion = "How is Steve Jobs and Elon Musk different and similar in handling difficult situations?";
        console.log(`Question: "${targetQuestion}"`);

        const qaResponse = await fetch(`${frontendUrl}/api/qa`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question: targetQuestion,
                bookId: book.id
            })
        });

        const qaResult = await qaResponse.json();

        if (qaResult.success) {
            console.log('\n✅ Q&A SUCCESS!');
            console.log('=' * 60);
            console.log('ANSWER:');
            console.log(qaResult.data.answer);
            console.log('=' * 60);
            console.log(`\nReferences found: ${qaResult.data.references.length}`);

            qaResult.data.references.forEach((ref, index) => {
                console.log(`\nReference ${index + 1} (Score: ${ref.relevanceScore}):`);
                console.log(ref.content.substring(0, 200) + (ref.content.length > 200 ? '...' : ''));
            });

            // Test additional leadership questions
            console.log('\n🎯 Testing additional leadership questions...');

            const additionalQuestions = [
                "What was Steve Jobs' leadership style during crisis situations?",
                "How did Steve Jobs handle difficult employees and situations?",
                "What made Steve Jobs an effective leader during Apple's challenges?"
            ];

            for (const question of additionalQuestions) {
                console.log(`\n🤖 Testing: "${question}"`);

                const qaResponse2 = await fetch(`${frontendUrl}/api/qa`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ question, bookId: book.id })
                });

                const qaResult2 = await qaResponse2.json();

                if (qaResult2.success) {
                    console.log('✅ Answer received:');
                    console.log(qaResult2.data.answer.substring(0, 300) + '...');
                    console.log(`References: ${qaResult2.data.references.length}`);
                } else {
                    console.log('❌ Failed:', qaResult2.error);
                }

                // Wait between questions
                await new Promise(resolve => setTimeout(resolve, 2000));
            }

        } else {
            console.log('❌ Q&A failed:', qaResult.error);
        }

    } catch (error) {
        console.log('❌ Test error:', error.message);
    }

    console.log('\n🏁 Test completed');
}

// Test function for just uploading the book
async function testBookUploadOnly() {
    console.log('📚 Testing book upload functionality only...');

    const frontendUrl = 'http://localhost:3001';
    const assetsDir = './assets';

    try {
        const steveJobsPath = path.join(assetsDir, '01_Steve_Jobs.pdf');

        if (!fs.existsSync(steveJobsPath)) {
            console.log(`❌ Steve Jobs book not found at: ${steveJobsPath}`);
            return;
        }

        const form = new FormData();
        form.append('file', fs.createReadStream(steveJobsPath));
        form.append('author', 'Walter Isaacson');

        console.log('📤 Uploading Steve Jobs biography...');
        const uploadResponse = await fetch(`${frontendUrl}/api/books`, {
            method: 'POST',
            body: form
        });

        const uploadResult = await uploadResponse.json();

        if (uploadResult.success) {
            console.log('✅ Upload successful!');
            console.log('Book details:', {
                id: uploadResult.data.id,
                title: uploadResult.data.title,
                author: uploadResult.data.author,
                fileSize: `${(uploadResult.data.fileSize / 1024 / 1024).toFixed(2)} MB`,
                notebookId: uploadResult.openNotebook?.notebookId,
                sourceId: uploadResult.openNotebook?.sourceId,
                integrated: uploadResult.openNotebook?.connected || false
            });
        } else {
            console.log('❌ Upload failed:', uploadResult.error);
        }
    } catch (error) {
        console.log('❌ Upload error:', error.message);
    }
}

// Run the appropriate test based on command line argument
const testType = process.argv[2];

if (testType === 'upload-only') {
    testBookUploadOnly();
} else {
    testSteveJobsQA();
}