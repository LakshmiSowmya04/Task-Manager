import { promises as fs } from 'fs';
import path from 'path';

// Define the mapping of old file names to new file names
const renameMap = {
    // Controllers
    'controllers/auth-controllers.js': 'controllers/auth.js',
    'controllers/healthcheck-controllers.js': 'controllers/health-check.js',
    'controllers/project-controller.js': 'controllers/project.js',
    'controllers/project-controllers.js': 'controllers/project.js',
    'controllers/task-controller.js': 'controllers/task.js',
    'controllers/task-controllers.js': 'controllers/task.js',
    
    // Models
    'models/project-models.js': 'models/project.js',
    'models/project.models.js': 'models/project.js',
    'models/task-models.js': 'models/task.js',
    'models/user-models.js': 'models/user.js',

    // Middlewares
    'middlewares/auth-middleware.js': 'middlewares/auth.js',

    // Routes
    'routes/auth-routes.js': 'routes/auth.js',
    'routes/healthcheck-routes.js': 'routes/health-check.js',
    'routes/project-routes.js': 'routes/project.js',
    'routes/task-routes.js': 'routes/task.js',

    // Utils
    'utils/ApiError.js': 'utils/api-error.js',
    'utils/ApiResponse.js': 'utils/api-response.js',
    'utils/asyncHandler.js': 'utils/async-handler.js'
};

// Get the directory name
const __dirname = path.resolve();

// Function to rename files based on the rename map
const renameFiles = async () => {
    for (const [oldPath, newPath] of Object.entries(renameMap)) {
        const oldFilePath = path.join(__dirname, oldPath);
        const newFilePath = path.join(__dirname, newPath);

        // Check if the old file exists
        try {
            await fs.access(oldFilePath);
            // Rename the file
            await fs.rename(oldFilePath, newFilePath);
            console.log(`Renamed: ${oldFilePath} -> ${newFilePath}`);
        } catch (error) {
            console.error(`File not found or error renaming: ${oldFilePath}`);
        }
    }
};

// Execute the rename function
renameFiles();
