# 🚀 Node.js AWS CI/CD - Complete Step-by-Step Guide (සිංහලෙන්)

මෙම guide එක **මුල සිට අවසාන දක්වා** ඔබව ගෙන යනවා. **කිසිවක් දන්නේ නැති** ඔබට සියල්ල පියවරෙන් පියවර කරා දෙන්නම්.

---

## 📋 Table of Contents

1. [අවශ්‍ය Software Install කරන්න](#step-1-අවශය-software-install-කරනන)
2. [AWS Account Setup](#step-2-aws-account-setup)
3. [Project Setup - Local](#step-3-project-setup---local)
4. [Docker Setup සහ Test](#step-4-docker-setup-සහ-test)
5. [AWS Infrastructure Deploy (Terraform)](#step-5-aws-infrastructure-deploy-terraform)
6. [First Docker Image ECR වලට Push](#step-6-first-docker-image-ecr-වලට-push)
7. [GitHub Repository Setup](#step-7-github-repository-setup)
8. [CI/CD Pipeline Configure](#step-8-cicd-pipeline-configure)
9. [First Deployment](#step-9-first-deployment)
10. [Verify සහ Test](#step-10-verify-සහ-test)

---

## Step 1: අවශ්‍ය Software Install කරන්න

### 1.1 Node.js Install කරන්න

**Windows:**

1. https://nodejs.org/ වෙබ් අඩවියට යන්න
2. **LTS version** (18.x හෝ 20.x) download කරන්න
3. Downloaded installer එක run කරන්න
4. "Next" click කරමින් install කරන්න (default settings OK)
5. Install වුනාට පස්සේ **Command Prompt** එකක් open කරන්න
6. මේ command එක type කරන්න verify කරන්න:

   ```cmd
   node --version
   ```

   Output: `v18.x.x` හෝ similar version එකක් පෙනේ නම් OK!

7. NPM version check කරන්න:
   ```cmd
   npm --version
   ```
   Output: `9.x.x` හෝ similar එකක් පෙනේ නම් OK!

---

### 1.2 Git Install කරන්න

**Windows:**

1. https://git-scm.com/download/win වෙබ් අඩවියට යන්න
2. "64-bit Git for Windows Setup" download කරන්න
3. Installer run කරන්න
4. **සියලු default options** තබා "Next" click කරන්න
5. Install අවසන් වුනාට පස්සේ verify කරන්න:
   ```cmd
   git --version
   ```
   Output: `git version 2.x.x` පෙනේ නම් OK!

---

### 1.3 Docker Desktop Install කරන්න

**Windows:**

1. https://www.docker.com/products/docker-desktop/ වෙබ් අඩවියට යන්න
2. "Download for Windows" click කරන්න
3. `Docker Desktop Installer.exe` download වෙනකම් wait කරන්න
4. Installer run කරන්න
5. **"Use WSL 2 instead of Hyper-V"** option check කරන්න (recommended)
6. Install කරන්න (මෙය 5-10 minutes ගත වෙනවා)
7. Install අවසන් වුනාම **computer restart** කරන්න
8. Restart වුනාට පස්සේ Docker Desktop application එක open කරන්න
9. Docker Desktop running වෙන එක තහවුරු කරන්න (system tray එකේ Docker icon එක)
10. Command Prompt එකක verify කරන්න:

    ```cmd
    docker --version
    ```

    Output: `Docker version 24.x.x` හෝ similar එකක් OK!

11. Docker running ද test කරන්න:
    ```cmd
    docker run hello-world
    ```
    "Hello from Docker!" message එක පෙනේ නම් perfect!

---

### 1.4 AWS CLI Install කරන්න

**Windows:**

1. https://aws.amazon.com/cli/ වෙබ් අඩවියට යන්න
2. "Download for Windows" click කරන්න
3. `AWSCLIV2.msi` installer download කරන්න
4. Downloaded file එක run කරන්න
5. Default settings සමඟ install කරන්න
6. **Command Prompt වහලා නැවත open කරන්න** (important!)
7. Verify කරන්න:
   ```cmd
   aws --version
   ```
   Output: `aws-cli/2.x.x` පෙනේ නම් OK!

---

### 1.5 Terraform Install කරන්න

**Windows:**

1. https://www.terraform.io/downloads වෙබ් අඩවියට යන්න
2. "Windows" සඳහා binary download කරන්න (AMD64)
3. Downloaded ZIP file එක extract කරන්න
4. `terraform.exe` file එක copy කරන්න
5. මේ folder එකකට paste කරන්න: `C:\terraform\`
6. **Environment Variable එකක් add කරන්න:**
   - Windows Search එකේ "Environment Variables" type කරන්න
   - "Edit the system environment variables" click කරන්න
   - "Environment Variables" button click කරන්න
   - "System variables" section එකේ "Path" select කරන්න
   - "Edit" click කරන්න
   - "New" click කර `C:\terraform\` add කරන්න
   - "OK" click කරන්න සියලු dialogs close කරන්න
7. **Command Prompt වහලා නැවත open කරන්න**
8. Verify කරන්න:
   ```cmd
   terraform --version
   ```
   Output: `Terraform v1.x.x` පෙනේ නම් OK!

---

## Step 2: AWS Account Setup

### 2.1 AWS Account එකක් Create කරන්න

1. https://aws.amazon.com/ වෙබ් අඩවියට යන්න
2. "Create an AWS Account" click කරන්න
3. ඔබගේ email address සහ account name enter කරන්න
4. Email verification කරන්න
5. Password එකක් set කරන්න
6. **Contact Information** fill කරන්න:
   - Account type: **Personal** select කරන්න
   - Full name, phone number, address දාන්න
7. **Payment Information** enter කරන්න:
   - Credit/Debit card details දාන්න
   - (AWS $1 charge කර verify කරනවා, ඒක refund වෙනවා)
8. **Identity Verification**:
   - Phone number verify කරන්න (OTP එකක් එනවා)
9. **Support Plan** select කරන්න:
   - **Basic Support - Free** select කරන්න
10. "Complete Sign Up" click කරන්න
11. Account ready වෙනකම් 5-10 minutes wait කරන්න

---

### 2.2 IAM User එකක් Create කරන්න (Programmatic Access)

1. AWS Console එකට login වෙන්න: https://console.aws.amazon.com/
2. Search bar එකේ **"IAM"** type කර IAM service එකට යන්න
3. Left menu එකේ **"Users"** click කරන්න
4. **"Create user"** button click කරන්න
5. **User details:**
   - User name: `github-actions-user`
   - "Next" click කරන්න
6. **Set permissions:**
   - "Attach policies directly" select කරන්න
   - Search box එකේ **"AdministratorAccess"** type කරන්න
   - "AdministratorAccess" policy එක check කරන්න ✓
   - (⚠️ Production සඳහා specific permissions දෙන්න, learning සඳහා මේක OK)
   - "Next" click කරන්න
7. **Review:**
   - "Create user" click කරන්න
8. User created වුනාට පස්සේ, **Access Keys create කරන්න:**
   - Created user එක click කරන්න
   - **"Security credentials"** tab එකට යන්න
   - **"Create access key"** button click කරන්න
   - Use case: **"Command Line Interface (CLI)"** select කරන්න
   - Checkbox තියෙන එක ✓ කරන්න
   - "Next" click කරන්න
   - Description (optional): `CI/CD Access`
   - **"Create access key"** click කරන්න
9. **⚠️ IMPORTANT - Keys Save කරන්න:**
   - **Access Key ID** copy කර notepad එකක save කරන්න
   - **Secret Access Key** copy කර notepad එකක save කරන්න
   - (මේ keys නැවත බලන්න බැහැ, හොඳින් save කරන්න!)
   - "Download .csv file" click කර file එකත් save කරන්න
   - "Done" click කරන්න

---

### 2.3 AWS CLI Configure කරන්න

1. Command Prompt එකක් open කරන්න
2. මේ command run කරන්න:
   ```cmd
   aws configure
   ```
3. Enter වෙන විදිහට:
   ```
   AWS Access Key ID [None]: <ඔබගේ Access Key ID paste කරන්න>
   AWS Secret Access Key [None]: <ඔබගේ Secret Access Key paste කරන්න>
   Default region name [None]: us-east-1
   Default output format [None]: json
   ```
4. Enter press කරන්න

5. Verify කරන්න configuration එක හරි ද:
   ```cmd
   aws sts get-caller-identity
   ```
   Output එකේ ඔබගේ Account ID, User ARN තියෙනවා නම් perfect! ✅

---

## Step 3: Project Setup - Local

### 3.1 Project Folder එකට Navigate කරන්න

1. Command Prompt open කරන්න
2. Project folder එකට යන්න:
   ```cmd
   cd C:\Users\Madupa Dilshan\Desktop\project\nodejs-aws-cicd
   ```

---

### 3.2 Dependencies Install කරන්න

1. NPM packages install කරන්න:

   ```cmd
   npm install
   ```

   මෙය `node_modules` folder එකක් create කර dependencies install කරනවා.

2. Wait කරන්න (30 seconds - 1 minute)

3. Success message එක පෙනේ නම්:
   ```
   added XXX packages
   ```
   Perfect! ✅

---

### 3.3 Application එක Locally Test කරන්න

1. Server start කරන්න:

   ```cmd
   npm start
   ```

2. Output එකේ පෙනේ:

   ```
   Server is running on port 3000
   Environment: development
   ```

3. Browser එකක් open කර යන්න:

   ```
   http://localhost:3000
   ```

4. මේ වගේ JSON response එකක් පෙනේ නම් OK:

   ```json
   {
     "message": "Welcome to Node.js AWS CI/CD Pipeline!",
     "status": "success",
     "timestamp": "2025-11-03T...",
     "environment": "development"
   }
   ```

5. Health check endpoint test කරන්න:

   ```
   http://localhost:3000/health
   ```

   Response:

   ```json
   {
     "status": "healthy",
     "uptime": 12.345,
     "timestamp": "..."
   }
   ```

6. Application working නම්, Command Prompt එකේ **Ctrl+C** press කර server එක stop කරන්න.

✅ **Local application working!**

---

## Step 4: Docker Setup සහ Test

### 4.1 Docker Image Build කරන්න

1. Docker Desktop running ද verify කරන්න (system tray icon බලන්න)

2. Project folder එකේම තියෙන command prompt එකේ:

   ```cmd
   docker build -t nodejs-cicd-app .
   ```

   මේ command:

   - `Dockerfile` use කර image එකක් build කරනවා
   - `-t nodejs-cicd-app` = image එකට tag එකක් දෙනවා
   - `.` = current folder එකේ Dockerfile use කරනවා

3. Build process බලන්න (1-3 minutes):

   ```
   [+] Building 45.2s (10/10) FINISHED
   => [internal] load build definition from Dockerfile
   => => transferring dockerfile: 32B
   => [internal] load .dockerignore
   ...
   => => naming to docker.io/library/nodejs-cicd-app
   ```

4. Build success නම්, image එක list එකේ තියෙනවා ද verify කරන්න:

   ```cmd
   docker images
   ```

   Output:

   ```
   REPOSITORY          TAG       IMAGE ID       CREATED         SIZE
   nodejs-cicd-app     latest    abc123def456   2 minutes ago   150MB
   ```

✅ **Docker image built successfully!**

---

### 4.2 Docker Container Run කරන්න

1. Container එකක් start කරන්න:

   ```cmd
   docker run -d -p 3000:3000 --name nodejs-app nodejs-cicd-app
   ```

   මේ command:

   - `-d` = detached mode (background එකේ run කරනවා)
   - `-p 3000:3000` = port 3000 map කරනවා
   - `--name nodejs-app` = container එකට name එකක් දෙනවා
   - `nodejs-cicd-app` = use කරන image එක

2. Container running ද check කරන්න:

   ```cmd
   docker ps
   ```

   Output:

   ```
   CONTAINER ID   IMAGE             COMMAND           STATUS        PORTS
   abc123def456   nodejs-cicd-app   "node server.js"  Up 5 seconds  0.0.0.0:3000->3000/tcp
   ```

3. Browser එකෙන් test කරන්න:

   ```
   http://localhost:3000
   ```

   Application respond කරනවා නම් perfect! ✅

4. Container logs බලන්න:

   ```cmd
   docker logs nodejs-app
   ```

   Output:

   ```
   Server is running on port 3000
   Environment: production
   ```

5. Container එක stop කරන්න:

   ```cmd
   docker stop nodejs-app
   ```

6. Container එක remove කරන්න:
   ```cmd
   docker rm nodejs-app
   ```

✅ **Docker working perfectly!**

---

## Step 5: AWS Infrastructure Deploy (Terraform)

### 5.1 Terraform Files Review කරන්න

1. Terraform folder එකට යන්න:

   ```cmd
   cd terraform
   ```

2. Terraform files තියෙනවා ද check කරන්න:

   ```cmd
   dir
   ```

   පෙනෙන්න ඕන:

   - `main.tf`
   - `variables.tf`
   - `outputs.tf`
   - `vpc.tf`
   - `ecs.tf`
   - `alb.tf`

---

### 5.2 Terraform Initialize කරන්න

1. Terraform initialize කරන්න:

   ```cmd
   terraform init
   ```

   මෙය:

   - AWS provider download කරනවා
   - Backend configure කරනවා
   - Modules initialize කරනවා

2. Success message බලන්න:
   ```
   Terraform has been successfully initialized!
   ```

✅ **Terraform initialized!**

---

### 5.3 Terraform Plan - Infrastructure Preview

1. Plan එක run කරන්න (changes බලන්න):

   ```cmd
   terraform plan
   ```

   මෙය show කරයි:

   - මොනවද create වෙන්නේ
   - කීයක් resources
   - එයාගෙ configuration

2. Output එක scroll කර බලන්න:

   ```
   Plan: 25 to add, 0 to change, 0 to destroy.
   ```

   25 resources විතර create වෙනවා (VPC, subnets, ECS, ALB, etc.)

---

### 5.4 Terraform Apply - Infrastructure Create කරන්න

⚠️ **IMPORTANT**: මෙය AWS වල resources create කරනවා. මුදල් අය කරන්න පුළුවන්.

1. Infrastructure create කරන්න:

   ```cmd
   terraform apply
   ```

2. Changes review කරන්න (scroll කර බලන්න)

3. Confirm කරන්න:

   ```
   Do you want to perform these actions?
   Enter a value:
   ```

   Type කරන්න: `yes`
   Enter press කරන්න

4. **Wait කරන්න** (මෙය 8-15 minutes විතර ගත වෙනවා):

   ```
   aws_vpc.main: Creating...
   aws_vpc.main: Creation complete after 2s
   aws_internet_gateway.main: Creating...
   ...
   aws_ecs_service.app: Still creating... [3m0s elapsed]
   ...
   Apply complete! Resources: 25 added, 0 changed, 0 destroyed.
   ```

5. **Success** වුනාම outputs පෙනේ:

   ```
   Outputs:

   alb_dns_name = "nodejs-cicd-alb-1234567890.us-east-1.elb.amazonaws.com"
   alb_url = "http://nodejs-cicd-alb-1234567890.us-east-1.elb.amazonaws.com"
   ecr_repository_url = "123456789012.dkr.ecr.us-east-1.amazonaws.com/nodejs-cicd-app"
   ecs_cluster_name = "nodejs-cicd-cluster"
   ecs_service_name = "nodejs-cicd-service"
   ```

6. **මේ outputs notepad එකක copy කර save කරන්න!** (පස්සේ අවශ්‍ය වෙනවා)

✅ **AWS Infrastructure created successfully!**

---

### 5.5 AWS Console වල Verify කරන්න

1. Browser එකෙන් AWS Console එකට යන්න: https://console.aws.amazon.com/

2. **VPC check:**

   - Search: "VPC"
   - "Your VPCs" click කරන්න
   - `nodejs-cicd-vpc` තියෙනවා ද බලන්න ✓

3. **ECR check:**

   - Search: "ECR"
   - Repositories click කරන්න
   - `nodejs-cicd-app` repository තියෙනවා ද බලන්න ✓

4. **ECS check:**

   - Search: "ECS"
   - Clusters click කරන්න
   - `nodejs-cicd-cluster` තියෙනවා ද බලන්න ✓

5. **Load Balancer check:**
   - Search: "EC2"
   - Left menu: "Load Balancers"
   - `nodejs-cicd-alb` තියෙනවා ද බලන්න ✓

✅ **All infrastructure visible in AWS Console!**

---

## Step 6: First Docker Image ECR වලට Push

### 6.1 ECR Login කරන්න

1. Project root folder එකට return වෙන්න:

   ```cmd
   cd ..
   ```

2. ECR repository URL එක ගන්න (terraform outputs වලින්):

   ```cmd
   cd terraform
   terraform output ecr_repository_url
   ```

   Output: `123456789012.dkr.ecr.us-east-1.amazonaws.com/nodejs-cicd-app`

   මේ URL එක copy කරන්න!

3. Project root එකට return:

   ```cmd
   cd ..
   ```

4. ECR වලට login වෙන්න:

   ```cmd
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com
   ```

   ⚠️ `123456789012.dkr.ecr.us-east-1.amazonaws.com` මේක ඔබගේ ECR URL එකෙන් replace කරන්න!

5. Success message:
   ```
   Login Succeeded
   ```

✅ **Logged in to ECR!**

---

### 6.2 Docker Image Tag කරන්න

1. Image එක tag කරන්න ECR වලට push කරන්න:

   ```cmd
   docker tag nodejs-cicd-app:latest 123456789012.dkr.ecr.us-east-1.amazonaws.com/nodejs-cicd-app:latest
   ```

   ⚠️ ECR URL එක ඔබගේ URL එකෙන් replace කරන්න!

2. Tagged images බලන්න:

   ```cmd
   docker images
   ```

   Output:

   ```
   REPOSITORY                                                  TAG       IMAGE ID
   123456789012.dkr.ecr.us-east-1.amazonaws.com/nodejs-cicd-app  latest    abc123def456
   nodejs-cicd-app                                             latest    abc123def456
   ```

---

### 6.3 Docker Image ECR වලට Push කරන්න

1. Image push කරන්න:

   ```cmd
   docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/nodejs-cicd-app:latest
   ```

   ⚠️ ECR URL එක replace කරන්න!

2. Upload progress බලන්න:

   ```
   The push refers to repository [123456789012.dkr.ecr.us-east-1.amazonaws.com/nodejs-cicd-app]
   abc123: Pushing [==============>                    ]  12.3MB/45.6MB
   ...
   latest: digest: sha256:abc123... size: 1234
   ```

3. Push complete වෙනකම් wait කරන්න (1-3 minutes network speed අනුව)

4. Success message:
   ```
   latest: digest: sha256:... size: ...
   ```

✅ **Docker image pushed to ECR!**

---

### 6.4 ECR වල Image තියෙනවා ද Verify කරන්න

1. AWS Console → ECR → Repositories
2. `nodejs-cicd-app` click කරන්න
3. Images tab එකේ `latest` tag එක පෙනෙනවා ද බලන්න ✓

හෝ CLI එකෙන්:

```cmd
aws ecr describe-images --repository-name nodejs-cicd-app --region us-east-1
```

✅ **Image available in ECR!**

---

## Step 7: GitHub Repository Setup

### 7.1 GitHub Account එකක් තියෙනවා නම්

- https://github.com/ වෙබ් අඩවියට යන්න
- Login වෙන්න

### 7.2 GitHub Account එකක් නැත්නම් Create කරන්න

1. https://github.com/signup වෙබ් අඩවියට යන්න
2. Email address enter කරන්න
3. Password create කරන්න
4. Username choose කරන්න
5. Email verify කරන්න
6. Account setup complete කරන්න

---

### 7.3 New Repository Create කරන්න

1. GitHub home page → **"+" icon** (top right) → **"New repository"**

2. Repository details:

   - **Repository name:** `nodejs-aws-cicd`
   - **Description:** `Node.js app with complete CI/CD pipeline using Terraform, Docker, and GitHub Actions`
   - **Visibility:** Private හෝ Public (ඔබට කැමති එක)
   - ⚠️ **DO NOT** initialize with README (අපි දැනටමත් files තියෙනවා)
   - **Create repository** click කරන්න

3. Repository created වුනාට පස්සේ පෙනෙන page එකේ commands තියෙනවා.

---

### 7.4 Local Project එක GitHub එකට Push කරන්න

1. Project folder එකේ Command Prompt open කරන්න:

   ```cmd
   cd C:\Users\Madupa Dilshan\Desktop\project\nodejs-aws-cicd
   ```

2. Git repository initialize කරන්න:

   ```cmd
   git init
   ```

3. Files stage කරන්න:

   ```cmd
   git add .
   ```

4. First commit කරන්න:

   ```cmd
   git commit -m "Initial commit: Complete CI/CD setup with Terraform, Docker, and GitHub Actions"
   ```

5. Default branch rename කරන්න (main):

   ```cmd
   git branch -M main
   ```

6. Remote repository add කරන්න:

   ```cmd
   git remote add origin https://github.com/YOUR-USERNAME/nodejs-aws-cicd.git
   ```

   ⚠️ **YOUR-USERNAME** ඔබගේ GitHub username එකෙන් replace කරන්න!

7. Code push කරන්න:

   ```cmd
   git push -u origin main
   ```

8. GitHub credentials අහනවා නම්:
   - Username enter කරන්න
   - Password වෙනුවට **Personal Access Token** use කරන්න (පහතින් බලන්න)

---

### 7.5 GitHub Personal Access Token Create කරන්න (If needed)

1. GitHub → Profile picture (top right) → **Settings**
2. Left sidebar → **Developer settings** (bottom)
3. **Personal access tokens** → **Tokens (classic)**
4. **Generate new token** → **Generate new token (classic)**
5. Note: `CI/CD Token`
6. Expiration: 90 days හෝ ඔබට කැමති duration එකක්
7. Select scopes:
   - ✓ `repo` (full control)
   - ✓ `workflow`
8. **Generate token** button click කරන්න
9. **Token copy කර safe place එකක save කරන්න!** (නැවත බලන්න බැහැ)

10. Token use කරන්න password වෙනුවට git push කරන විට.

---

### 7.6 GitHub එකේ Code තියෙනවා ද Verify කරන්න

1. Browser එකෙන් ඔබගේ repository එකට යන්න:

   ```
   https://github.com/YOUR-USERNAME/nodejs-aws-cicd
   ```

2. Files පෙනෙනවා ද බලන්න:
   - `.github/workflows/deploy.yml`
   - `terraform/` folder
   - `Dockerfile`
   - `server.js`
   - `package.json`
   - `README.md`

✅ **Code pushed to GitHub successfully!**

---

## Step 8: CI/CD Pipeline Configure

### 8.1 GitHub Secrets Add කරන්න

මෙතන AWS credentials GitHub එකේ safely store කරන්නේ.

1. GitHub repository එකේ: **Settings** tab click කරන්න

2. Left sidebar: **Secrets and variables** → **Actions** click කරන්න

3. **New repository secret** button click කරන්න

4. **First Secret - AWS Access Key:**

   - Name: `AWS_ACCESS_KEY_ID`
   - Secret: `<ඔබගේ AWS Access Key ID paste කරන්න>`
   - **Add secret** click කරන්න

5. **Second Secret - AWS Secret Key:**

   - **New repository secret** click කරන්න again
   - Name: `AWS_SECRET_ACCESS_KEY`
   - Secret: `<ඔබගේ AWS Secret Access Key paste කරන්න>`
   - **Add secret** click කරන්න

6. Secrets list එකේ මේ දෙක පෙනෙනවා ද verify කරන්න:
   - `AWS_ACCESS_KEY_ID` ✓
   - `AWS_SECRET_ACCESS_KEY` ✓

✅ **GitHub Secrets configured!**

---

### 8.2 Workflow File Review කරන්න

1. Local editor එකෙන් `.github/workflows/deploy.yml` file එක open කරන්න

2. මේ values ඔබගේ Terraform outputs වලින් match වෙනවා ද check කරන්න:

   ```yaml
   env:
     AWS_REGION: us-east-1
     ECR_REPOSITORY: nodejs-cicd-app # ECR repository name
     ECS_CLUSTER: nodejs-cicd-cluster # ECS cluster name
     ECS_SERVICE: nodejs-cicd-service # ECS service name
     CONTAINER_NAME: nodejs-cicd-container # Container name
   ```

3. සියල්ල match වෙනවා නම් OK! ✅

4. වෙනස් වුනා නම්, ඒවා edit කර save කරන්න, git commit & push කරන්න:
   ```cmd
   git add .github/workflows/deploy.yml
   git commit -m "Update workflow configuration"
   git push origin main
   ```

---

## Step 9: First Deployment

### 9.1 Trigger First Deployment

1. GitHub Actions workflow trigger කරන්න හිතාමතා:

   **Option 1: Small change එකක් කර push කරන්න**

   Local එකේ `server.js` file open කර message එක change කරන්න:

   ```javascript
   message: 'Welcome to Node.js AWS CI/CD Pipeline - Version 1.0!',
   ```

   Save කර push කරන්න:

   ```cmd
   git add server.js
   git commit -m "Update welcome message - trigger deployment"
   git push origin main
   ```

   **Option 2: Empty commit push කරන්න**

   ```cmd
   git commit --allow-empty -m "Trigger initial deployment"
   git push origin main
   ```

---

### 9.2 GitHub Actions Workflow Monitor කරන්න

1. Browser එකෙන් GitHub repository එකට යන්න

2. **Actions** tab click කරන්න

3. Latest workflow run එක click කරන්න:

   - Workflow name: "CI/CD Pipeline"
   - Triggered by: push event

4. Workflow වල තියෙන Jobs:

   - ✅ **Test** - Tests run කරනවා
   - 🔄 **Build** - Docker image build & push කරනවා
   - 🔄 **Deploy** - ECS වලට deploy කරනවා

5. සෑම job එකක්ම click කර progress බලන්න:

   **Test job:**

   ```
   Run Tests
   ✓ Checkout code
   ✓ Setup Node.js
   ✓ Install dependencies
   ✓ Run tests
   ```

   **Build job:**

   ```
   Build and Push Docker Image
   ✓ Checkout code
   ✓ Configure AWS credentials
   ✓ Login to Amazon ECR
   ✓ Build, tag, and push image
   ✓ Scan Docker image
   ```

   **Deploy job:**

   ```
   Deploy to ECS
   ✓ Checkout code
   ✓ Configure AWS credentials
   ✓ Download task definition
   ✓ Fill in new image ID
   ✓ Deploy ECS task definition
   ✓ Verify deployment
   ```

6. **සියලු jobs green checkmarks (✓) තියෙනවා නම්**, deployment successful! 🎉

7. පුළුවන් නම් full workflow 5-8 minutes විතර ගත වෙනවා.

---

### 9.3 Deployment Errors තියෙනවා නම්

**Error: "Error: Could not find task definition"**

මෙයින් අදහස් කරන්නේ ECS වල active task definition එකක් නැහැ කියලා. මෙය first deployment එකේදී සිද්ධ වෙන්න පුළුවන්.

**Fix:**

1. AWS Console → ECS → Task Definitions
2. `nodejs-cicd-task` select කරන්න
3. Latest revision select කර **Actions** → **Run Task** click කරන්න
4. Cluster: `nodejs-cicd-cluster` select කරන්න
5. Launch type: Fargate
6. VPC: `nodejs-cicd-vpc` select කරන්න
7. Subnets: Private subnets select කරන්න
8. Security group: `nodejs-cicd-ecs-tasks-sg` select කරන්න
9. **Run Task** click කරන්න

පස්සේ GitHub Actions workflow එක නැවත run කරන්න:

- Actions tab → Failed workflow → **Re-run all jobs**

---

## Step 10: Verify සහ Test

### 10.1 Application URL එක ගන්න

1. Terraform outputs වලින් ALB URL ගන්න:

   ```cmd
   cd terraform
   terraform output alb_url
   ```

   Output:

   ```
   "http://nodejs-cicd-alb-1234567890.us-east-1.elb.amazonaws.com"
   ```

2. මේ URL copy කරන්න

---

### 10.2 Browser එකෙන් Application Test කරන්න

1. Browser එකක් open කර ALB URL එකට යන්න:

   ```
   http://nodejs-cicd-alb-1234567890.us-east-1.elb.amazonaws.com
   ```

2. ඔබගේ application JSON response එක පෙනේ නම්:

   ```json
   {
     "message": "Welcome to Node.js AWS CI/CD Pipeline - Version 1.0!",
     "status": "success",
     "timestamp": "2025-11-03T...",
     "environment": "production"
   }
   ```

   🎉 **Application LIVE වැඩකරනවා!** 🎉

3. Health endpoint test කරන්න:

   ```
   http://your-alb-url/health
   ```

4. Info endpoint:
   ```
   http://your-alb-url/api/info
   ```

---

### 10.3 AWS Console වල Verify කරන්න

**ECS Tasks:**

1. AWS Console → ECS → Clusters → `nodejs-cicd-cluster`
2. Services tab → `nodejs-cicd-service` click කරන්න
3. Tasks tab බලන්න
4. 2 tasks "RUNNING" status එකේ තියෙනවා ද check කරන්න ✓

**Load Balancer:**

1. AWS Console → EC2 → Load Balancers
2. `nodejs-cicd-alb` select කරන්න
3. Description tab → DNS name copy කර browser එකෙන් test කරන්න

**Target Health:**

1. Load Balancer page → Target Groups tab (bottom)
2. `nodejs-cicd-tg` click කරන්න
3. Targets tab → Health status = "healthy" ✓

---

### 10.4 CloudWatch Logs බලන්න

**AWS Console:**

1. AWS Console → CloudWatch → Logs → Log groups
2. `/ecs/nodejs-cicd` log group click කරන්න
3. Latest log stream click කරන්න
4. Application logs පෙනෙනවා:
   ```
   Server is running on port 3000
   Environment: production
   ```

**CLI:**

```cmd
aws logs tail /ecs/nodejs-cicd --follow
```

---

### 10.5 CI/CD Pipeline Test කරන්න

දැන් අපි test කරමු automatic deployment එක working ද කියලා:

1. Local එකේ `server.js` file open කරන්න

2. Message එක change කරන්න:

   ```javascript
   message: 'Welcome to Node.js AWS CI/CD Pipeline - Version 2.0!',
   ```

3. Save කරන්න

4. Git commit & push:

   ```cmd
   git add server.js
   git commit -m "Update to version 2.0"
   git push origin main
   ```

5. GitHub Actions tab බලන්න - New workflow run start වෙනවා 🔄

6. Workflow complete වෙනකම් wait කරන්න (5-8 minutes)

7. Application URL එක refresh කරන්න browser එකෙන්

8. New message එක පෙනේ නම්:

   ```json
   {
     "message": "Welcome to Node.js AWS CI/CD Pipeline - Version 2.0!",
     ...
   }
   ```

   🎉 **CI/CD Pipeline working perfectly!** 🎉

---

## 🎊 CONGRATULATIONS! 🎊

ඔබ successfully complete කළා:

✅ Node.js application එකක් development
✅ Docker containerization
✅ AWS infrastructure (VPC, ECS, ECR, ALB) with Terraform
✅ Complete CI/CD pipeline with GitHub Actions
✅ Automatic deployments
✅ Production application running on AWS

---

## 📊 What You Have Now:

🏗️ **Infrastructure:**

- VPC with public/private subnets
- NAT Gateways සහ Internet Gateway
- Application Load Balancer
- ECS Cluster with Fargate
- ECR Repository
- CloudWatch Logs
- Security Groups සහ IAM Roles

🔄 **CI/CD Pipeline:**

- Automated testing
- Docker image building
- ECR push
- ECS deployment
- GitHub Actions workflow

🚀 **Live Application:**

- Production environment
- Load balanced
- Auto-scaling ready
- Health checks
- Logging

---

## 🧹 Cleanup (අවශ්‍ය වුනොත්)

AWS charges නතර කරන්න අවශ්‍ය නම් resources delete කරන්න:

### විධිය 1: Terraform මගින්

```cmd
cd terraform
terraform destroy
```

Type: `yes` Enter

### විධිය 2: Manual

1. **ECS Service:**

   ```cmd
   aws ecs update-service --cluster nodejs-cicd-cluster --service nodejs-cicd-service --desired-count 0
   aws ecs delete-service --cluster nodejs-cicd-cluster --service nodejs-cicd-service --force
   ```

2. **Wait 2 minutes**

3. **Terraform Destroy:**
   ```cmd
   cd terraform
   terraform destroy
   ```

---

## 🆘 Common Issues සහ Solutions

### Issue 1: Application URL 503 Error

**Problem:** ALB URL access කරන විට "503 Service Unavailable"

**Solution:**

- Wait 2-3 minutes (tasks start වෙන්න time ගත වෙනවා)
- ECS console එකෙන් tasks "RUNNING" ද check කරන්න
- Target group health "healthy" ද check කරන්න

### Issue 2: GitHub Actions Fail - ECR Login

**Problem:** "Error: Cannot perform an interactive login from a non TTY device"

**Solution:**

- GitHub Secrets හරි ද verify කරන්න
- AWS credentials valid ද test කරන්න local එකේ:
  ```cmd
  aws sts get-caller-identity
  ```

### Issue 3: ECS Tasks CrashLoopBackOff

**Problem:** Tasks repeatedly fail

**Solution:**

- CloudWatch logs check කරන්න
- Docker image locally test කරන්න
- Health check endpoint working ද verify කරන්න

### Issue 4: Terraform Apply Fails

**Problem:** "Error creating VPC" හෝ similar errors

**Solution:**

```cmd
terraform destroy
terraform apply
```

---

## 📚 Next Steps

දැන් ඔබට කරන්න පුළුවන්:

1. **Custom Domain add කරන්න:**

   - Route 53 use කරන්න
   - HTTPS/SSL certificates add කරන්න

2. **Database add කරන්න:**

   - RDS PostgreSQL හෝ MySQL
   - DynamoDB for NoSQL

3. **Monitoring improve කරන්න:**

   - CloudWatch Dashboards
   - Alarms setup කරන්න

4. **Scaling configure කරන්න:**

   - Auto Scaling policies
   - CPU/Memory based scaling

5. **Security enhance කරන්න:**
   - WAF add කරන්න
   - Secrets Manager use කරන්න
   - IAM roles improve කරන්න

---

## 🎓 ඔබ ඉගෙන ගත්තේ:

✅ Node.js application development
✅ Docker containerization
✅ Infrastructure as Code (Terraform)
✅ AWS services (VPC, ECS, ECR, ALB)
✅ CI/CD pipelines (GitHub Actions)
✅ DevOps best practices
✅ Cloud deployment

---

**මේ guide එක ප්‍රයෝජනවත් වුනා නම්, star එකක් දෙන්න! ⭐**

අවශ්‍ය දෙයක් තියෙනවා නම් හෝ error එකක් තියෙනවා නම් GitHub Issues එකේ report කරන්න.

**Happy Coding! 🚀**
