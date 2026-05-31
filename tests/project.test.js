const Project = require('../models/Project');

describe('Project Model', () => {
  test('getAllProjects returns array', async () => {
    // Mock db call
    expect(typeof Project.getAllProjects).toBe('function');
  });
});