// Comprehensive test suite for notebook upload and Q&A functionality
// Tests the specific question about Steve Jobs and Elon Musk differences and similarities

const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

class QATestSuite {
    constructor() {
        this.frontendUrl = 'http://localhost:3001';
        this.openNotebookUrl = 'http://localhost:5055';
        this.testResults = [];
    }

    async log(message, type = 'info') {
        const timestamp = new Date().toISOString();
        const emoji = {
            info: 'ℹ️',
            success: '✅',
            warning: '⚠️',
            error: '❌',
            test: '🧪'
        }[type] || 'ℹ️';

        const logMessage = `${emoji} [${timestamp}] ${message}`;
        console.log(logMessage);
        this.testResults.push({ timestamp, type, message });
    }

    async testServiceConnectivity() {
        this.log('Testing service connectivity...', 'test');

        try {
            const frontendResponse = await fetch(`${this.frontendUrl}/api/books`);
            if (frontendResponse.ok) {
                this.log('Frontend API is responding', 'success');
            } else {
                throw new Error(`Frontend API returned ${frontendResponse.status}`);
            }

            const openNotebookResponse = await fetch(`${this.openNotebookUrl}/health`);
            if (openNotebookResponse.ok) {
                this.log('Open Notebook API is responding', 'success');
            } else {
                throw new Error(`Open Notebook API returned ${openNotebookResponse.status}`);
            }

            return true;
        } catch (error) {
            this.log(`Service connectivity failed: ${error.message}`, 'error');
            return false;
        }
    }

    async checkModelsConfiguration() {
        this.log('Checking AI models configuration...', 'test');

        try {
            const response = await fetch(`${this.openNotebookUrl}/api/models`);
            if (!response.ok) {
                this.log('Failed to fetch models configuration', 'warning');
                return false;
            }

            const models = await response.json();
            const chatModel = models.find(m => m.is_default_chat);
            const embeddingModel = models.find(m => m.is_default_embedding);

            if (chatModel && embeddingModel) {
                this.log(`Chat model: ${chatModel.name}`, 'success');
                this.log(`Embedding model: ${embeddingModel.name}`, 'success');
                return { chatModel, embeddingModel, configured: true };
            } else {
                this.log('AI models not properly configured', 'warning');
                this.log('Chat model found: ' + (chatModel ? 'Yes' : 'No'), 'warning');
                this.log('Embedding model found: ' + (embeddingModel ? 'Yes' : 'No'), 'warning');
                return { chatModel: null, embeddingModel: null, configured: false };
            }
        } catch (error) {
            this.log(`Models check failed: ${error.message}`, 'error');
            return { configured: false, error: error.message };
        }
    }

    async getExistingBooks() {
        this.log('Fetching existing books...', 'test');

        try {
            const response = await fetch(`${this.frontendUrl}/api/books`);
            const result = await response.json();

            if (result.success) {
                const books = result.data;
                this.log(`Found ${books.length} existing books`, 'info');

                for (const book of books) {
                    this.log(`Book: "${book.title}" by ${book.author || 'Unknown'}`, 'info');
                    this.log(`  - ID: ${book.id}`, 'info');
                    this.log(`  - Notebook: ${book.notebookId || 'Not created'}`, 'info');
                    this.log(`  - Source: ${book.sourceId || 'Not created'}`, 'info');
                }

                return books;
            } else {
                throw new Error(result.error || 'Failed to fetch books');
            }
        } catch (error) {
            this.log(`Failed to fetch books: ${error.message}`, 'error');
            return [];
        }
    }

    async uploadTestBook(title = 'Leadership Styles Test Book', content = null) {
        this.log(`Uploading test book: ${title}...`, 'test');

        const testContent = content || `# Leadership Styles: Steve Jobs vs Elon Musk

## Steve Jobs Leadership Style

### Handling Difficult Situations
Steve Jobs was known for his perfectionist approach and demanding leadership style when facing challenges:

**Similarities with Elon Musk:**
- Both leaders were highly demanding of their teams
- Both had a vision-driven approach to problem-solving
- Both were willing to take significant risks
- Both pushed teams beyond conventional limits
- Both had a hands-on approach during crises
- Both were known for their passionate communication style

**Key Differences:**
Steve Jobs approached difficult situations with:
- More secretive and controlled communication
- Focus on design perfection over technical innovation
- Tendency to simplify and eliminate options
- More authoritarian decision-making process
- Emphasis on intuitive rather than data-driven decisions

### Crisis Management Examples
During the iPhone antenna crisis in 2010, Jobs initially denied the problem but eventually called a press conference to address it directly. His approach was to control the narrative and focus on solutions.

When Apple was near bankruptcy in 1997, Jobs made swift, decisive cuts to product lines, focusing only on core products that aligned with his vision.

## Elon Musk Leadership Style

### Handling Difficult Situations
Elon Musk takes a more transparent and engineering-focused approach to challenges:

**Key Differences from Steve Jobs:**
Elon Musk approaches difficult situations with:
- More transparent and public communication via social media
- Focus on technical innovation and pushing boundaries
- Tendency to explore multiple solutions simultaneously
- More collaborative problem-solving approach
- Heavy reliance on first-principles thinking and data
- Willingness to admit mistakes and pivot quickly

### Crisis Management Examples
During Tesla's "production hell" in 2018, Musk was very public about the challenges, sleeping at the factory and providing regular updates on progress.

When facing the Twitter acquisition challenges, Musk maintained public communication about his decisions and reasoning, though sometimes controversial.

## Summary of Leadership Approaches

**Similarities:**
1. Both demanded excellence from their teams
2. Both were willing to take enormous risks
3. Both had transformative visions for their industries
4. Both worked extremely long hours during crises
5. Both inspired intense loyalty in their core teams
6. Both were willing to make unpopular decisions

**Key Differences:**
1. **Communication Style**: Jobs was more secretive and controlled; Musk is more transparent and direct
2. **Decision Making**: Jobs relied more on intuition; Musk relies more on engineering principles
3. **Problem Solving**: Jobs focused on simplification; Musk focuses on innovation
4. **Team Interaction**: Jobs was more hierarchical; Musk is more collaborative
5. **Public Persona**: Jobs carefully managed his image; Musk is more spontaneous and unfiltered

Both leaders transformed their respective industries through their unique approaches to handling pressure and difficult situations.`;

        try {
            // Create temporary file
            const tempFilePath = path.join(__dirname, `temp-${title.replace(/[^a-zA-Z0-9]/g, '-')}.txt`);
            fs.writeFileSync(tempFilePath, testContent);

            const form = new FormData();
            form.append('file', fs.createReadStream(tempFilePath));
            form.append('author', 'Test Author');

            const uploadResponse = await fetch(`${this.frontendUrl}/api/books`, {
                method: 'POST',
                body: form
            });

            const uploadResult = await uploadResponse.json();

            // Clean up temp file
            fs.unlinkSync(tempFilePath);

            if (uploadResult.success) {
                this.log(`Book uploaded successfully: ${uploadResult.data.id}`, 'success');
                this.log(`Notebook ID: ${uploadResult.openNotebook?.notebookId}`, 'info');
                this.log(`Source ID: ${uploadResult.openNotebook?.sourceId}`, 'info');

                return {
                    success: true,
                    book: uploadResult.data,
                    openNotebook: uploadResult.openNotebook
                };
            } else {
                throw new Error(uploadResult.error || 'Upload failed');
            }
        } catch (error) {
            this.log(`Book upload failed: ${error.message}`, 'error');
            return { success: false, error: error.message };
        }
    }

    async testQAFunctionality(bookId, question = "How is Steve Jobs and Elon Musk different and similar in handling difficult situations?") {
        this.log(`Testing Q&A functionality...`, 'test');
        this.log(`Question: "${question}"`, 'info');
        this.log(`Book ID: ${bookId}`, 'info');

        try {
            const qaResponse = await fetch(`${this.frontendUrl}/api/qa`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    question: question,
                    bookId: bookId
                })
            });

            const qaResult = await qaResponse.json();

            if (qaResult.success) {
                this.log('Q&A functionality working!', 'success');
                this.log(`Answer (first 200 chars): ${qaResult.data.answer.substring(0, 200)}...`, 'info');
                this.log(`Full answer length: ${qaResult.data.answer.length} characters`, 'info');
                this.log(`References found: ${qaResult.data.references.length}`, 'info');

                // Log references
                qaResult.data.references.forEach((ref, index) => {
                    this.log(`Reference ${index + 1}: Score ${ref.relevanceScore}, Content: ${ref.content.substring(0, 100)}...`, 'info');
                });

                return {
                    success: true,
                    answer: qaResult.data.answer,
                    references: qaResult.data.references,
                    questionAsked: question
                };
            } else {
                this.log(`Q&A failed: ${qaResult.error}`, 'error');
                return {
                    success: false,
                    error: qaResult.error,
                    questionAsked: question
                };
            }
        } catch (error) {
            this.log(`Q&A test error: ${error.message}`, 'error');
            return {
                success: false,
                error: error.message,
                questionAsked: question
            };
        }
    }

    async testMultipleQuestions(bookId) {
        this.log('Testing multiple Q&A questions...', 'test');

        const questions = [
            "How is Steve Jobs and Elon Musk different and similar in handling difficult situations?",
            "What are the key leadership differences between Steve Jobs and Elon Musk?",
            "How do Steve Jobs and Elon Musk approach crisis management differently?",
            "What similarities exist in Steve Jobs and Elon Musk leadership styles?",
            "Compare the communication styles of Steve Jobs and Elon Musk during crises"
        ];

        const results = [];

        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            this.log(`Question ${i + 1}/${questions.length}: ${question}`, 'info');

            const result = await this.testQAFunctionality(bookId, question);
            results.push(result);

            // Wait between questions to avoid overwhelming the API
            if (i < questions.length - 1) {
                this.log('Waiting 2 seconds before next question...', 'info');
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }

        const successful = results.filter(r => r.success).length;
        this.log(`Multi-question test completed: ${successful}/${questions.length} successful`, successful === questions.length ? 'success' : 'warning');

        return results;
    }

    async runComprehensiveTest() {
        this.log('🚀 Starting Comprehensive Q&A Test Suite', 'test');
        this.log('='.repeat(60), 'info');

        const testStart = Date.now();

        // Step 1: Test connectivity
        const connectivity = await this.testServiceConnectivity();
        if (!connectivity) {
            this.log('Cannot proceed without service connectivity', 'error');
            return this.generateReport();
        }

        // Step 2: Check models
        const modelsConfig = await this.checkModelsConfiguration();

        // Step 3: Get existing books
        const existingBooks = await this.getExistingBooks();

        // Step 4: Find or upload a suitable book
        let targetBook = null;
        const steveJobsBook = existingBooks.find(book =>
            book.title.toLowerCase().includes('steve') ||
            book.content?.toLowerCase().includes('steve jobs')
        );

        if (steveJobsBook && steveJobsBook.notebookId && steveJobsBook.sourceId) {
            this.log('Found existing Steve Jobs book with notebook integration', 'success');
            targetBook = steveJobsBook;
        } else {
            this.log('No suitable book found, uploading test book...', 'info');
            const uploadResult = await this.uploadTestBook();
            if (uploadResult.success) {
                targetBook = uploadResult.book;
            } else {
                this.log('Failed to upload test book', 'error');
                return this.generateReport();
            }
        }

        // Step 5: Wait for processing if needed
        if (targetBook.notebookId && targetBook.sourceId) {
            this.log('Book has notebook integration, waiting for processing...', 'info');
            await new Promise(resolve => setTimeout(resolve, 3000));
        }

        // Step 6: Test Q&A functionality
        if (modelsConfig.configured) {
            const qaResult = await this.testQAFunctionality(
                targetBook.id,
                "How is Steve Jobs and Elon Musk different and similar in handling difficult situations?"
            );

            if (qaResult.success) {
                // Step 7: Test multiple questions
                await this.testMultipleQuestions(targetBook.id);
            }
        } else {
            this.log('Skipping Q&A tests due to model configuration issues', 'warning');
        }

        const testEnd = Date.now();
        this.log(`Test suite completed in ${(testEnd - testStart) / 1000}s`, 'info');
        this.log('='.repeat(60), 'info');

        return this.generateReport();
    }

    generateReport() {
        const report = {
            timestamp: new Date().toISOString(),
            totalTests: this.testResults.length,
            successful: this.testResults.filter(r => r.type === 'success').length,
            warnings: this.testResults.filter(r => r.type === 'warning').length,
            errors: this.testResults.filter(r => r.type === 'error').length,
            results: this.testResults
        };

        this.log('📊 Test Report Generated', 'info');
        this.log(`Total Tests: ${report.totalTests}`, 'info');
        this.log(`Successful: ${report.successful}`, 'success');
        this.log(`Warnings: ${report.warnings}`, 'warning');
        this.log(`Errors: ${report.errors}`, report.errors > 0 ? 'error' : 'info');

        return report;
    }
}

// Export for use as module or run directly
if (require.main === module) {
    const testSuite = new QATestSuite();
    testSuite.runComprehensiveTest()
        .then(report => {
            console.log('\n🏁 Test Suite Complete!');
            console.log('Report saved to memory - check logs above for details');
        })
        .catch(error => {
            console.error('❌ Test Suite Failed:', error);
            process.exit(1);
        });
}

module.exports = QATestSuite;