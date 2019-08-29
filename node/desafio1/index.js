const express = require('express');

const server = express();
server.use(express.json());

const projects = [];
let countRequests = 0;

function checkProjectExist(req, res, next) {
    const { id } = req.params;
    const project = projects.find(item => Number(item.id) === Number(id));

    if (!project) {
        return res.status(400).json({ error: "Project not found" });
    }

    return next();
};

function logRequests(req, res, next) {
    countRequests++;
    console.log(`Numero de requisições: ${countRequests}`);

    return next();
}

server.use(logRequests);

server.get('/projects', (req, res) => {
    res.json(projects);
});

server.get('/projects/:id', checkProjectExist, (req, res) => {
    const { id } = req.params;

    const project = projects.find(item => Number(item.id) === Number(id));

    res.json(project);
});

server.post('/projects', (req, res) => {
    const { id, title, tasks } = req.body;

    const project = { id, title, tasks };

    projects.push(project);

    res.json(projects);
});

server.put('/projects/:id', checkProjectExist, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(item => Number(item.id) === Number(id));

    project.title = title;

    res.json(projects);
});

server.delete('/projects/:id', checkProjectExist, (req, res) => {
    const { id } = req.params;

    const projectIndex = projects.findIndex(item => Number(item.id) === Number(id));

    projects.splice(projectIndex, 1);

    res.send();
});

server.post('/projects/:id/tasks', checkProjectExist, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(item => Number(item.id) === Number(id));

    project.tasks.push(title);

    res.json(projects);
});

server.listen(3000);
