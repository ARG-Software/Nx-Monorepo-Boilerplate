const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const allowedProjects = new Set([
  'frontend',
  'client-api',
  'action-log-service',
]);
const projectName = process.argv[2];
const publishArgument = process.argv[3];

if (!allowedProjects.has(projectName)) {
  console.error(
    'Usage: node tools/docker/publish_docker.js <frontend|client-api|action-log-service> [true|false]'
  );
  process.exit(1);
}

if (
  publishArgument !== undefined &&
  !['true', 'false'].includes(publishArgument)
) {
  console.error('The publish-image argument must be true or false.');
  process.exit(1);
}

const publishImage = publishArgument === 'true';
const contextPath = path.join('apps', projectName);
const dockerfile = path.join(contextPath, 'Dockerfile');

let version;
try {
  const packageJson = fs.readFileSync(
    path.join(contextPath, 'package.json'),
    'utf8'
  );
  version = JSON.parse(packageJson).version;
  if (typeof version !== 'string' || version.length === 0) {
    throw new Error('package.json does not contain a version');
  }
} catch (error) {
  console.error(`Unable to read the ${projectName} version: ${error.message}`);
  process.exit(1);
}

const localImage = `${projectName}-${version}`;
const imageRepository =
  process.env.DOCKER_IMAGE_REPOSITORY || 'argsoftware/nx-template';
const publishedImage = `${imageRepository}:${projectName}-${version}`;

try {
  if (publishImage) {
    loginToDocker();
    if (dockerImageExists(publishedImage)) {
      throw new Error(`Docker image ${publishedImage} already exists`);
    }
  }

  console.log(`Building Docker image ${localImage}`);
  runDocker(['build', '--file', dockerfile, '--tag', localImage, contextPath]);
  runDocker(['tag', localImage, publishedImage]);

  if (publishImage) {
    console.log(`Publishing Docker image ${publishedImage}`);
    runDocker(['push', publishedImage]);
  }
} catch (error) {
  console.error(`Docker operation failed: ${error.message}`);
  process.exit(1);
}

function dockerImageExists(image) {
  const result = spawnSync('docker', ['manifest', 'inspect', image], {
    shell: false,
    stdio: 'ignore',
  });

  if (result.error) {
    throw result.error;
  }

  return result.status === 0;
}

function runDocker(args, options = {}) {
  const result = spawnSync('docker', args, {
    shell: false,
    stdio: 'inherit',
    ...options,
  });

  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(`docker ${args[0]} exited with status ${result.status}`);
  }
}

function loginToDocker() {
  const username = process.env.DOCKER_USERNAME;
  const password = process.env.DOCKER_PASSWORD;

  if (!username || !password) {
    throw new Error('DOCKER_USERNAME and DOCKER_PASSWORD must be set');
  }

  runDocker(['login', '--username', username, '--password-stdin'], {
    input: `${password}\n`,
    stdio: ['pipe', 'inherit', 'inherit'],
  });
}
