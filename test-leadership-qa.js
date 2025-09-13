// Test suite for leadership comparison Q&A using actual Steve Jobs and Elon Musk books
// Tests the specific question: "How is Steve Jobs and Elon Musk different and similar in handling difficult situations?"

const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

class LeadershipQATest {
    constructor() {
        this.frontendUrl = 'http://localhost:3001';
        this.openNotebookUrl = 'http://localhost:5055';
        this.assetsDir = './assets';
        this.testResults = [];
        this.uploadedBooks = [];
    }

    log(message, type = 'info') {
        const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
        const emoji = {
            info: 'ℹ️',
            success: '✅',
            warning: '⚠️',
            error: '❌',
            test: '🧪',
            upload: '📚',
            qa: '🤖'
        }[type] || 'ℹ️';

        const logMessage = `${emoji} [${timestamp}] ${message}`;
        console.log(logMessage);
        this.testResults.push({ timestamp, type, message });
    }

    async checkServices() {
        this.log('Checking service availability...', 'test');

        try {
            // Check frontend
            const frontendResponse = await fetch(`${this.frontendUrl}/api/books`);
            if (!frontendResponse.ok) throw new Error(`Frontend: ${frontendResponse.status}`);

            // Check Open Notebook
            const onResponse = await fetch(`${this.openNotebookUrl}/health`);
            if (!onResponse.ok) throw new Error(`Open Notebook: ${onResponse.status}`);

            // Check models
            const modelsResponse = await fetch(`${this.openNotebookUrl}/api/models`);
            const models = await modelsResponse.json();
            const chatModel = models.find(m => m.is_default_chat);
            const embeddingModel = models.find(m => m.is_default_embedding);

            if (chatModel && embeddingModel) {
                this.log(`Services ready - Chat: ${chatModel.name}, Embedding: ${embeddingModel.name}`, 'success');
                return { ready: true, chatModel, embeddingModel };
            } else {
                this.log('AI models not configured - Q&A will not work', 'warning');
                return { ready: false, modelsConfigured: false };
            }
        } catch (error) {
            this.log(`Service check failed: ${error.message}`, 'error');
            return { ready: false, error: error.message };
        }
    }

    async uploadBook(bookPath, expectedTitle) {
        this.log(`Uploading ${expectedTitle}...`, 'upload');

        if (!fs.existsSync(bookPath)) {
            this.log(`Book not found: ${bookPath}`, 'error');
            return null;
        }

        try {
            const form = new FormData();
            form.append('file', fs.createReadStream(bookPath));
            form.append('author', 'Biography');

            const uploadResponse = await fetch(`${this.frontendUrl}/api/books`, {
                method: 'POST',
                body: form
            });

            const result = await uploadResponse.json();

            if (result.success) {
                const book = result.data;
                const openNotebook = result.openNotebook;

                this.log(`✓ Uploaded: ${book.title}`, 'success');
                this.log(`  Book ID: ${book.id}`, 'info');
                this.log(`  Notebook: ${openNotebook?.notebookId || 'Failed'}`, 'info');
                this.log(`  Source: ${openNotebook?.sourceId || 'Failed'}`, 'info');
                this.log(`  File size: ${(book.fileSize / 1024 / 1024).toFixed(2)} MB`, 'info');

                this.uploadedBooks.push({
                    title: expectedTitle,
                    bookId: book.id,
                    notebookId: openNotebook?.notebookId,
                    sourceId: openNotebook?.sourceId,
                    connected: openNotebook?.connected || false
                });

                return book;
            } else {
                this.log(`Upload failed: ${result.error}`, 'error');
                return null;
            }
        } catch (error) {
            this.log(`Upload error: ${error.message}`, 'error');
            return null;
        }
    }

    async uploadRequiredBooks() {
        this.log('Uploading required books for leadership comparison...', 'test');

        const books = [
            { path: path.join(this.assetsDir, '01_Steve_Jobs.pdf'), title: 'Steve Jobs' },
            { path: path.join(this.assetsDir, '03_Elon_Musk.pdf'), title: 'Elon Musk' }
        ];

        const uploadPromises = books.map(book => this.uploadBook(book.path, book.title));
        const results = await Promise.all(uploadPromises);

        const successful = results.filter(r => r !== null).length;
        this.log(`Book uploads completed: ${successful}/${books.length} successful`,
                successful === books.length ? 'success' : 'warning');

        if (successful > 0) {
            this.log('Waiting 5 seconds for processing...', 'info');
            await new Promise(resolve => setTimeout(resolve, 5000));
        }

        return successful > 0;
    }

    async testLeadershipQuestions() {
        this.log('Testing leadership comparison questions...', 'qa');

        // Find a book that should contain relevant information
        const targetBook = this.uploadedBooks.find(book =>
            book.connected && (book.title.includes('Steve') || book.title.includes('Elon'))
        );

        if (!targetBook) {
            this.log('No suitable book found for Q&A testing', 'error');
            return [];
        }

        this.log(`Using book: ${targetBook.title} (ID: ${targetBook.bookId})`, 'info');

        const questions = [
            {
                id: 'main_question',
                text: "How is Steve Jobs and Elon Musk different and similar in handling difficult situations?",
                description: "Main comparison question"
            },
            {
                id: 'leadership_styles',
                text: "What are the key differences in leadership styles between Steve Jobs and Elon Musk?",
                description: "Leadership styles comparison"
            },
            {
                id: 'crisis_management',
                text: "How did Steve Jobs handle crisis situations and difficult decisions?",
                description: "Steve Jobs crisis management"
            },
            {
                id: 'innovation_approach',
                text: "What was Steve Jobs' approach to innovation and handling setbacks?",
                description: "Innovation and setbacks handling"
            },
            {
                id: 'team_management',
                text: "How did Steve Jobs manage teams during challenging projects?",
                description: "Team management during challenges"
            }
        ];

        const results = [];

        for (const question of questions) {
            this.log(`Testing: ${question.description}`, 'qa');
            this.log(`Question: "${question.text}"`, 'info');

            try {
                const qaResponse = await fetch(`${this.frontendUrl}/api/qa`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        question: question.text,
                        bookId: targetBook.bookId
                    })
                });

                const qaResult = await qaResponse.json();

                if (qaResult.success) {
                    const answer = qaResult.data.answer;
                    const references = qaResult.data.references;

                    this.log(`✓ Answer received (${answer.length} chars, ${references.length} refs)`, 'success');

                    // Log key insights from the answer
                    if (answer.length > 200) {
                        this.log(`Preview: ${answer.substring(0, 200)}...`, 'info');
                    }

                    // Show reference quality
                    const avgScore = references.reduce((sum, ref) => sum + (ref.relevanceScore || 0), 0) / references.length;
                    if (references.length > 0) {
                        this.log(`Average relevance score: ${avgScore.toFixed(2)}`, 'info');
                    }

                    results.push({
                        question: question,
                        success: true,
                        answer: answer,
                        references: references,
                        answerLength: answer.length,
                        referenceCount: references.length,
                        averageRelevance: avgScore || 0
                    });

                    // Show top reference snippet
                    if (references.length > 0) {
                        const topRef = references[0];
                        this.log(`Top reference (score: ${topRef.relevanceScore}): ${topRef.content.substring(0, 150)}...`, 'info');
                    }

                } else {
                    this.log(`✗ Q&A failed: ${qaResult.error}`, 'error');
                    results.push({
                        question: question,
                        success: false,
                        error: qaResult.error
                    });
                }

            } catch (error) {
                this.log(`✗ Q&A error: ${error.message}`, 'error');
                results.push({
                    question: question,
                    success: false,
                    error: error.message
                });
            }

            // Wait between questions to avoid overwhelming the API
            if (question !== questions[questions.length - 1]) {
                await new Promise(resolve => setTimeout(resolve, 3000));
            }
        }

        return results;
    }

    async analyzeResults(qaResults) {
        this.log('Analyzing Q&A results...', 'test');

        const successful = qaResults.filter(r => r.success);
        const failed = qaResults.filter(r => !r.success);

        this.log(`Results: ${successful.length} successful, ${failed.length} failed`,
                failed.length === 0 ? 'success' : 'warning');

        if (successful.length > 0) {
            const avgAnswerLength = successful.reduce((sum, r) => sum + r.answerLength, 0) / successful.length;
            const avgReferences = successful.reduce((sum, r) => sum + r.referenceCount, 0) / successful.length;
            const avgRelevance = successful.reduce((sum, r) => sum + r.averageRelevance, 0) / successful.length;

            this.log(`Average answer length: ${avgAnswerLength.toFixed(0)} characters`, 'info');
            this.log(`Average references per answer: ${avgReferences.toFixed(1)}`, 'info');
            this.log(`Average relevance score: ${avgRelevance.toFixed(2)}`, 'info');

            // Highlight the main question result
            const mainResult = successful.find(r => r.question.id === 'main_question');
            if (mainResult) {
                this.log('='.repeat(60), 'info');
                this.log('MAIN QUESTION RESULT:', 'success');
                this.log(`Question: ${mainResult.question.text}`, 'info');
                this.log(`Answer: ${mainResult.answer}`, 'info');
                this.log('='.repeat(60), 'info');
            }
        }

        if (failed.length > 0) {
            this.log('Failed questions:', 'warning');
            failed.forEach(r => {
                this.log(`- ${r.question.description}: ${r.error}`, 'warning');
            });
        }

        return {
            total: qaResults.length,
            successful: successful.length,
            failed: failed.length,
            avgAnswerLength: successful.length > 0 ? successful.reduce((sum, r) => sum + r.answerLength, 0) / successful.length : 0,
            avgReferences: successful.length > 0 ? successful.reduce((sum, r) => sum + r.referenceCount, 0) / successful.length : 0,
            avgRelevance: successful.length > 0 ? successful.reduce((sum, r) => sum + r.averageRelevance, 0) / successful.length : 0,
            results: qaResults
        };
    }

    async runTest() {
        this.log('🚀 Starting Leadership Q&A Test Suite', 'test');
        this.log('Testing question: "How is Steve Jobs and Elon Musk different and similar in handling difficult situations?"', 'info');
        this.log('=' * 80, 'info');

        const startTime = Date.now();

        // Step 1: Check services
        const serviceCheck = await this.checkServices();
        if (!serviceCheck.ready) {
            this.log('Cannot proceed - services not ready', 'error');
            return this.generateReport();
        }

        // Step 2: Upload books
        const uploadSuccess = await this.uploadRequiredBooks();
        if (!uploadSuccess) {
            this.log('Cannot proceed - book uploads failed', 'error');
            return this.generateReport();
        }

        // Step 3: Test Q&A
        let qaResults = [];
        if (serviceCheck.ready && serviceCheck.chatModel) {
            qaResults = await this.testLeadershipQuestions();
        } else {
            this.log('Skipping Q&A tests - models not configured', 'warning');
        }

        // Step 4: Analyze results
        const analysis = await this.analyzeResults(qaResults);

        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000;

        this.log(`Test completed in ${duration.toFixed(1)} seconds`, 'success');

        return this.generateReport(analysis);
    }

    generateReport(analysis = null) {
        const report = {
            timestamp: new Date().toISOString(),
            duration: Date.now(),
            uploadedBooks: this.uploadedBooks,
            analysis: analysis,
            testResults: this.testResults
        };

        this.log('📊 FINAL TEST REPORT', 'success');
        this.log('=' * 50, 'info');

        if (analysis) {
            this.log(`Q&A Tests: ${analysis.successful}/${analysis.total} successful`,
                    analysis.successful === analysis.total ? 'success' : 'warning');

            if (analysis.successful > 0) {
                this.log(`Average answer quality:`, 'info');
                this.log(`  - Length: ${analysis.avgAnswerLength.toFixed(0)} chars`, 'info');
                this.log(`  - References: ${analysis.avgReferences.toFixed(1)}`, 'info');
                this.log(`  - Relevance: ${analysis.avgRelevance.toFixed(2)}`, 'info');
            }
        }

        this.log(`Books uploaded: ${this.uploadedBooks.length}`, 'info');
        this.uploadedBooks.forEach(book => {
            this.log(`  - ${book.title}: ${book.connected ? '✓' : '✗'} integrated`, 'info');
        });

        this.log('🏁 Test suite completed', 'success');

        return report;
    }
}

// Export for module use or run directly
if (require.main === module) {
    const testSuite = new LeadershipQATest();
    testSuite.runTest()
        .then(report => {
            console.log('\n✅ Leadership Q&A Test Suite Complete!');
            process.exit(0);
        })
        .catch(error => {
            console.error('❌ Test Suite Failed:', error);
            process.exit(1);
        });
}

module.exports = LeadershipQATest;