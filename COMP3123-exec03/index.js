const http = require('http');
const employeeModule = require('./Employee');

const port = process.env.PORT || 8081;

const sendJson = (res, statusCode, data) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(data));
};

const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        return sendJson(res, 405, { error: http.STATUS_CODES[405] });
    }

    const pathname = req.url.split('?')[0];

    switch (pathname) {
        case '/':
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            return res.end('<h1>Welcome to Lab Exercise 03</h1>');
        case '/employee':
            return sendJson(res, 200, employeeModule);
        case '/employee/names': {
            const names = employeeModule
                .map(({ firstName, lastName }) => `${firstName} ${lastName}`)
                .sort((first, second) => first.localeCompare(second));
            return sendJson(res, 200, names);
        }
        case '/employee/totalsalary': {
            const totalSalary = employeeModule.reduce((total, employee) => total + employee.Salary, 0);
            return sendJson(res, 200, { total_salary: totalSalary });
        }
        default:
            return sendJson(res, 404, { error: http.STATUS_CODES[404] });
    }
});

server.listen(port, () => {
    console.log(`Lab 03 - Node.js | Server listening on port ${port}`);
});
