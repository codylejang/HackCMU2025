// Test script for frontend-open notebook integration

const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testIntegration() {
    console.log('🧪 Testing Frontend ↔ Open Notebook Integration');

    // Test 1: Check if both services are running
    console.log('\n1. Checking service connectivity...');

    try {
        const frontendResponse = await fetch('http://localhost:3001/api/books');
        console.log('✅ Frontend API responding:', frontendResponse.status);

        const openNotebookResponse = await fetch('http://localhost:5055/health');
        console.log('✅ Open Notebook API responding:', openNotebookResponse.status);
    } catch (error) {
        console.error('❌ Service connectivity error:', error.message);
        return;
    }

    // Test 2: Test book upload and notebook creation
    console.log('\n2. Testing book upload with notebook creation...');

    const testFilePath = path.join(__dirname, 'test-book.txt');

    try {
        const form = new FormData();
        form.append('file', fs.createReadStream(testFilePath));
        form.append('author', 'Test Author');

        const uploadResponse = await fetch('http://localhost:3001/api/books', {
            method: 'POST',
            body: form
        });

        const uploadResult = await uploadResponse.json();

        if (uploadResult.success) {
            console.log('✅ Book uploaded successfully');
            console.log('📚 Book ID:', uploadResult.data.id);
            console.log('📓 Notebook ID:', uploadResult.openNotebook?.notebookId);
            console.log('📄 Source ID:', uploadResult.openNotebook?.sourceId);

            if (uploadResult.openNotebook?.connected) {
                console.log('✅ Open Notebook integration working!');

                // Test 3: Test Q&A functionality
                console.log('\n3. Testing Q&A functionality...');

                // Wait a moment for processing
                await new Promise(resolve => setTimeout(resolve, 2000));

                const qaResponse = await fetch('http://localhost:3001/api/qa', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        question: "What is this book about?",
                        bookId: uploadResult.data.id
                    })
                });

                const qaResult = await qaResponse.json();

                if (qaResult.success) {
                    console.log('✅ Q&A functionality working!');
                    console.log('🤖 AI Answer:', qaResult.data.answer.substring(0, 200) + '...');
                    console.log('📚 References found:', qaResult.data.references.length);
                } else {
                    console.log('⚠️ Q&A test result:', qaResult.error);
                }

            } else {
                console.log('⚠️ Open Notebook integration not connected');
            }
        } else {
            console.error('❌ Book upload failed:', uploadResult.error);
        }

    } catch (error) {
        console.error('❌ Upload test error:', error.message);
    }

    console.log('\n🏁 Integration test completed');
}

// Run the test
testIntegration().catch(console.error);