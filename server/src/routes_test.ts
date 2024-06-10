// import * as assert from 'assert';
// import * as httpMocks from 'node-mocks-http';
// import { add, addScore, list, load, resetForTesting, resetScoresForTesting, scoreList } from './routes';


// describe('routes', function () {

//   it('add', function () {
//     // First branch, straight line code, error case
//     const req3 = httpMocks.createRequest(
//       { method: 'POST', url: '/api/add', body: { name: undefined, value: { test: 1 } } });
//     const res3 = httpMocks.createResponse();
//     add(req3, res3);
//     assert.strictEqual(res3._getStatusCode(), 400);
//     assert.deepStrictEqual(res3._getData(),
//       'missing "name" parameter');

//     const req5 = httpMocks.createRequest(
//       { method: 'POST', url: '/api/add', body: { name: 1, value: { test: 1 } } });
//     const res5 = httpMocks.createResponse();
//     add(req5, res5);
//     assert.strictEqual(res5._getStatusCode(), 400);
//     assert.deepStrictEqual(res5._getData(),
//       'missing "name" parameter');

//     const req6 = httpMocks.createRequest(
//       { method: 'POST', url: '/api/add', body: { name: false, value: { test: 1 } } });
//     const res6 = httpMocks.createResponse();
//     add(req6, res6);
//     assert.strictEqual(res6._getStatusCode(), 400);
//     assert.deepStrictEqual(res6._getData(),
//       'missing "name" parameter');

//     // Second branch, straight line code, error case (only one possible input)
//     const req4 = httpMocks.createRequest(
//       { method: 'POST', url: '/api/add', body: { name: 'file1', value: undefined } });
//     const res4 = httpMocks.createResponse();
//     add(req4, res4);
//     assert.strictEqual(res4._getStatusCode(), 400);
//     assert.deepStrictEqual(res4._getData(),
//       'missing "value" parameter');
//     const req42 = httpMocks.createRequest(
//       { method: 'POST', url: '/api/add', body: { name: 'tasda', value: undefined } });
//     const res42 = httpMocks.createResponse();
//     add(req42, res42);
//     assert.strictEqual(res42._getStatusCode(), 400);
//     assert.deepStrictEqual(res42._getData(),
//       'missing "value" parameter');

//     // Fourth branch, straight line code
//     const req1 = httpMocks.createRequest(
//       { method: 'POST', url: '/api/add', body: { name: 'file1', value: { test: 1 } } });
//     const res1 = httpMocks.createResponse();
//     add(req1, res1);
//     assert.strictEqual(res1._getStatusCode(), 200);
//     assert.deepEqual(res1._getData(), { success: true });

//     const req8 = httpMocks.createRequest(
//       { method: 'POST', url: '/api/add', body: { name: '120310', value: "asidoaidoa" } });
//     const res8 = httpMocks.createResponse();
//     add(req8, res8);
//     assert.strictEqual(res8._getStatusCode(), 200);
//     assert.deepEqual(res8._getData(), { success: true });


//     // Third branch, straight line code, error case
//     const req51 = httpMocks.createRequest(
//       { method: 'POST', url: '/api/add', body: { name: '120310', value: "123" } });
//     const res51 = httpMocks.createResponse();
//     add(req51, res51);
//     assert.strictEqual(res51._getStatusCode(), 409);
//     assert.deepStrictEqual(res51._getData(),
//       'deck with name: 120310 already exists');

//     const req52 = httpMocks.createRequest(
//       { method: 'POST', url: '/api/add', body: { name: 'file1', value: { test: "a" } } });
//     const res52 = httpMocks.createResponse();
//     add(req52, res52);
//     assert.strictEqual(res52._getStatusCode(), 409);
//     assert.deepStrictEqual(res52._getData(),
//       'deck with name: file1 already exists');

//     resetForTesting();
//   });

//   it('list', function () {
//     // Saving files for testing
//     const req3 = httpMocks.createRequest(
//       { method: 'POST', url: '/api/add', body: { name: '120310', value: "asidoaidoa" } });
//     const res3 = httpMocks.createResponse();
//     add(req3, res3);

//     // Straight line code
//     const req1 = httpMocks.createRequest(
//       { method: 'GET', url: '/api/list', query: {} });
//     const res1 = httpMocks.createResponse();
//     list(req1, res1);
//     assert.strictEqual(res1._getStatusCode(), 200);
//     assert.deepEqual(res1._getData(), { values: ["120310"] });

//     // Saving files for testing
//     const req4 = httpMocks.createRequest(
//       { method: 'POST', url: '/api/add', body: { name: 'file1', value: { test: 1 } } });
//     const res4 = httpMocks.createResponse();
//     add(req4, res4);

//     const req2 = httpMocks.createRequest(
//       { method: 'GET', url: '/api/list', query: {} });
//     const res2 = httpMocks.createResponse();
//     list(req2, res2);
//     assert.strictEqual(res2._getStatusCode(), 200);
//     assert.deepEqual(res2._getData(), { values: ["120310", "file1"] });

//     resetForTesting();
//   });


//   it('load', function () {
//     // First branch, straight line code, error case
//     const req12 = httpMocks.createRequest(
//       { method: 'GET', url: '/api/load', query: { name: undefined } });
//     const res12 = httpMocks.createResponse();
//     load(req12, res12);
//     assert.strictEqual(res12._getStatusCode(), 400);
//     assert.deepEqual(res12._getData(), 'missing "name" parameter');

//     const req13 = httpMocks.createRequest(
//       { method: 'GET', url: '/api/load', query: { name: {} } });
//     const res13 = httpMocks.createResponse();
//     load(req13, res13);
//     assert.strictEqual(res13._getStatusCode(), 400);
//     assert.deepEqual(res13._getData(), 'missing "name" parameter');

//     const req14 = httpMocks.createRequest(
//       { method: 'GET', url: '/api/load', query: { name: 1.2 } });
//     const res14 = httpMocks.createResponse();
//     load(req14, res14);
//     assert.strictEqual(res14._getStatusCode(), 400);
//     assert.deepEqual(res14._getData(), 'missing "name" parameter');

//     // Second branch, straight line code, error case
//     const req15 = httpMocks.createRequest(
//       { method: 'GET', url: '/api/load', query: { name: "120310" } });
//     const res15 = httpMocks.createResponse();
//     load(req15, res15);
//     assert.strictEqual(res15._getStatusCode(), 404);
//     assert.deepEqual(res15._getData(), 'file with name: 120310 does not exist');

//     const req16 = httpMocks.createRequest(
//       { method: 'GET', url: '/api/load', query: { name: "Testing123" } });
//     const res16 = httpMocks.createResponse();
//     load(req16, res16);
//     assert.strictEqual(res16._getStatusCode(), 404);
//     assert.deepEqual(res16._getData(), 'file with name: Testing123 does not exist');

//     // Third branch, straight line code
//     // Saving files for testing
//     const req11 = httpMocks.createRequest(
//       {
//         method: 'POST', url: '/api/add', body: {
//           name: '120310',
//           value: { 1: { a: "A", }, 2: false }
//         }
//       });
//     const res11 = httpMocks.createResponse();
//     add(req11, res11);

//     const req1 = httpMocks.createRequest(
//       { method: 'GET', url: '/api/load', query: { name: "120310" } });
//     const res1 = httpMocks.createResponse();
//     load(req1, res1);
//     assert.strictEqual(res1._getStatusCode(), 200);
//     assert.deepEqual(res1._getData(), { value: { 1: { a: "A", }, 2: false } });

//     // Saving files for testing
//     const req21 = httpMocks.createRequest(
//       { method: 'POST', url: '/api/add', body: { name: 'Test', value: { a: "A", b: "B" } } });
//     const res21 = httpMocks.createResponse();
//     add(req21, res21);

//     const req2 = httpMocks.createRequest(
//       { method: 'GET', url: '/api/load', query: { name: "Test" } });
//     const res2 = httpMocks.createResponse();
//     load(req2, res2);
//     assert.strictEqual(res2._getStatusCode(), 200);
//     assert.deepEqual(res2._getData(), { value: { a: "A", b: "B" } });

//     resetForTesting();
//   });

//   it('scoreList', function () {
//     // Saving decks for testing
//     const req11 = httpMocks.createRequest(
//       { method: 'POST', url: '/api/add', body: { name: 'CSE 331 Final Review', value: {} } });
//     const res11 = httpMocks.createResponse();
//     add(req11, res11);

//     const req12 = httpMocks.createRequest(
//       { method: 'POST', url: '/api/add', body: { name: 'CSE 311 Final Review', value: {} } });
//     const res12 = httpMocks.createResponse();
//     add(req12, res12);

//     // Saving score for testing
//     const req3 = httpMocks.createRequest(
//       {
//         method: 'POST', url: '/api/addScore',
//         body: {
//           name: "Richard",
//           value: ["CSE 331 Final Review", 100]
//         }
//       });
//     const res3 = httpMocks.createResponse();
//     addScore(req3, res3);

//     // Straight line code
//     const req1 = httpMocks.createRequest(
//       { method: 'GET', url: '/api/scoreList', query: {} });
//     const res1 = httpMocks.createResponse();
//     scoreList(req1, res1);
//     assert.strictEqual(res1._getStatusCode(), 200);
//     assert.deepEqual(res1._getData(), { values: [["Richard", "CSE 331 Final Review", 100]] });

//     // Saving score for testing
//     const req4 = httpMocks.createRequest(
//       {
//         method: 'POST', url: '/api/addScore',
//         body: { name: 'Robbie', value: ["CSE 311 Final Review", 71] }
//       });
//     const res4 = httpMocks.createResponse();
//     addScore(req4, res4);

//     const req2 = httpMocks.createRequest(
//       { method: 'GET', url: '/api/scoreList', query: {} });
//     const res2 = httpMocks.createResponse();
//     scoreList(req2, res2);
//     assert.strictEqual(res2._getStatusCode(), 200);
//     assert.deepEqual(res2._getData(), {
//       values: [
//         ["Richard", "CSE 331 Final Review", 100],
//         ['Robbie', "CSE 311 Final Review", 71]
//       ]
//     });

//     resetScoresForTesting();
//   });

//   it('addScore', function () {
//     // Saving decks for testing
//     const req11 = httpMocks.createRequest(
//       { method: 'POST', url: '/api/add', body: { name: 'CSE 331 Final Review', value: {} } });
//     const res11 = httpMocks.createResponse();
//     add(req11, res11);

//     const req12 = httpMocks.createRequest(
//       { method: 'POST', url: '/api/add', body: { name: 'CSE 311 Final Review', value: {} } });
//     const res12 = httpMocks.createResponse();
//     add(req12, res12);

//     // First Branch, straight line code, error case
//     const req1 = httpMocks.createRequest(
//       {
//         method: 'POST', url: '/api/addScore',
//         body: {
//           name: undefined,
//           value: ['CSE 331 Final Review', 1]
//         }
//       });
//     const res1 = httpMocks.createResponse();
//     addScore(req1, res1);
//     assert.strictEqual(res1._getStatusCode(), 400);
//     assert.deepEqual(res1._getData(), 'missing "name" parameter');

//     const req2 = httpMocks.createRequest(
//       {
//         method: 'POST', url: '/api/addScore',
//         body: {
//           name: 1,
//           value: ['CSE 331 Final Review', 1]
//         }
//       });
//     const res2 = httpMocks.createResponse();
//     addScore(req2, res2);
//     assert.strictEqual(res2._getStatusCode(), 400);
//     assert.deepEqual(res2._getData(), 'missing "name" parameter');

//     // Second Branch, straight line code, error case
//     const req3 = httpMocks.createRequest(
//       { method: 'POST', url: '/api/addScore', body: { name: "Richard", undefined } });
//     const res3 = httpMocks.createResponse();
//     addScore(req3, res3);
//     assert.strictEqual(res3._getStatusCode(), 400);
//     assert.deepEqual(res3._getData(), 'missing "value" parameter');

//     const req4 = httpMocks.createRequest(
//       { method: 'POST', url: '/api/addScore', body: { name: "Richard", value: undefined } });
//     const res4 = httpMocks.createResponse();
//     addScore(req4, res4);
//     assert.strictEqual(res4._getStatusCode(), 400);
//     assert.deepEqual(res4._getData(), 'missing "value" parameter');

//     // Third Branch, straight line code, error case
//     const req5 = httpMocks.createRequest(
//       { method: 'POST', url: '/api/addScore', body: { name: "Richard", value: "123" } });
//     const res5 = httpMocks.createResponse();
//     addScore(req5, res5);
//     assert.strictEqual(res5._getStatusCode(), 400);
//     assert.deepEqual(res5._getData(), 'invalid "value" parameter');

//     const req6 = httpMocks.createRequest(
//       { method: 'POST', url: '/api/addScore', body: { name: "Richard", value: true } });
//     const res6 = httpMocks.createResponse();
//     addScore(req6, res6);
//     assert.strictEqual(res6._getStatusCode(), 400);
//     assert.deepEqual(res6._getData(), 'invalid "value" parameter');

//     // Fourth Branch, straight line code, error case
//     const req7 = httpMocks.createRequest(
//       {
//         method: 'POST', url: '/api/addScore',
//         body: {
//           name: "Richard",
//           value: [{}, 50]
//         }
//       });
//     const res7 = httpMocks.createResponse();
//     addScore(req7, res7);
//     assert.strictEqual(res7._getStatusCode(), 400);
//     assert.deepEqual(res7._getData(), 'deckName in "value" parameter is not a string');

//     const req8 = httpMocks.createRequest(
//       {
//         method: 'POST', url: '/api/addScore',
//         body: {
//           name: "Richard",
//           value: [undefined, 50]
//         }
//       });
//     const res8 = httpMocks.createResponse();
//     addScore(req8, res8);
//     assert.strictEqual(res8._getStatusCode(), 400);
//     assert.deepEqual(res8._getData(), 'deckName in "value" parameter is not a string');

//     // Fifth Branch, straight line code, error case
//     const req9 = httpMocks.createRequest(
//       {
//         method: 'POST', url: '/api/addScore',
//         body: {
//           name: "Richard",
//           value: ["CSE 331 Final Review", "Hello"]
//         }
//       });
//     const res9 = httpMocks.createResponse();
//     addScore(req9, res9);
//     assert.strictEqual(res9._getStatusCode(), 400);
//     assert.deepEqual(res9._getData(), 'score in "value" parameter is not a number');

//     const req10 = httpMocks.createRequest(
//       {
//         method: 'POST', url: '/api/addScore',
//         body: {
//           name: "Richard",
//           value: ["CSE 331 Final Review", undefined]
//         }
//       });
//     const res10 = httpMocks.createResponse();
//     addScore(req10, res10);
//     assert.strictEqual(res10._getStatusCode(), 400);
//     assert.deepEqual(res10._getData(), 'score in "value" parameter is not a number');

//     // Sixth Branch, straight line code, error case
//     const req21 = httpMocks.createRequest(
//       {
//         method: 'POST', url: '/api/addScore',
//         body: {
//           name: "Richard",
//           value: ["Random Review", 50]
//         }
//       });
//     const res21 = httpMocks.createResponse();
//     addScore(req21, res21);
//     assert.strictEqual(res21._getStatusCode(), 400);
//     assert.deepEqual(res21._getData(), 'deckName in "value" parameter is not a valid deck');

//     const req22 = httpMocks.createRequest(
//       {
//         method: 'POST', url: '/api/addScore',
//         body: {
//           name: "Richard",
//           value: ["Dummy", 50]
//         }
//       });
//     const res22 = httpMocks.createResponse();
//     addScore(req22, res22);
//     assert.strictEqual(res22._getStatusCode(), 400);
//     assert.deepEqual(res22._getData(), 'deckName in "value" parameter is not a valid deck');

//     // Seventh Branch, straight line code
//     const req23 = httpMocks.createRequest(
//       {
//         method: 'POST', url: '/api/addScore',
//         body: {
//           name: "Richard",
//           value: ["CSE 331 Final Review", 50]
//         }
//       });
//     const res23 = httpMocks.createResponse();
//     addScore(req23, res23);
//     assert.strictEqual(res23._getStatusCode(), 200);
//     assert.deepEqual(res23._getData(), { success: true });

//     const req24 = httpMocks.createRequest(
//       {
//         method: 'POST', url: '/api/addScore',
//         body: {
//           name: "Richard",
//           value: ["CSE 311 Final Review", 80]
//         }
//       });
//     const res24 = httpMocks.createResponse();
//     addScore(req24, res24);
//     assert.strictEqual(res24._getStatusCode(), 200);
//     assert.deepEqual(res24._getData(), { success: true });
//   });

// });
