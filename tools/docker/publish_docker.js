const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

//Get arguments
const projectName = process.argv[2];
console.log(`Project name: ${projectName}`);
if (!projectName) {
  console.log('Usage: node publishDocker.js <project-name>');
  process.exit(1);
}

let publishImage = process.argv[3];
console.log(`Publish image: ${publishImage}`);
//cast to boolean
publishImage = publishImage === 'true';
if (publishImage != true && publishImage != false) {
  console.log(
    'Usage: node publishDocker.js <project-name> <publish-image>, publish-image should be true or false'
  );
  process.exit(1);
}

const contextPath = 'apps/' + projectName;
console.log(`Directory: ${contextPath}`);
const dockerfile = contextPath + '/Dockerfile';
console.log(`Dockerfile: ${dockerfile}`);

// Determine the current version
let version;
try {
  version = JSON.parse(
    fs.readFileSync(path.join(contextPath, 'package.json'))
  ).version;
  console.log(`Version: ${version}`);
} catch (error) {
  console.error('Error retrieving version from package.json', error);
  process.exit(1);
}

// Build and push the Docker image
try {
  console.log(`Building Docker image for ${projectName} ${version}`);
  execSync(
    `docker build -f ${dockerfile} ${contextPath} -t ${projectName}-${version}`,
    { stdio: 'inherit' }
  );
  execSync(
    `docker tag ${projectName}-${version} argsoftware/nx-template:${projectName}-${version}`,
    { stdio: 'inherit' }
  );

  if (publishImage) {
    console.log(`Publishing Docker image for ${projectName} ${version}`);
    loginToDocker();
    execSync(`docker push argsoftware/nx-template:${projectName}-${version}`, {
      stdio: 'inherit',
    });
    console.log(
      `Docker image published successfully for ${projectName} ${version}`
    );
  }
} catch (error) {
  console.error('Docker operation failed', error);
  process.exit(1);
}

function loginToDocker() {
  try {
    // Check if credentials are loaded
    console.log(`Docker username: ${process.env.DOCKER_USERNAME}`);
    console.log('Docker password: *****');

    if (!process.env.DOCKER_USERNAME || !process.env.DOCKER_PASSWORD) {
      console.log('Error: Docker credentials not set.');
      process.exit(1);
    }
    execSync(
      `docker login -u ${process.env.DOCKER_USERNAME} -p ${process.env.DOCKER_PASSWORD}`,
      { stdio: 'inherit' }
    );
    console.log('Docker login successful.');
  } catch (error) {
    console.error('Docker login failed', error);
    process.exit(1);
  }
}
