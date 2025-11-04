# Node.js AWS CI/CD Pipeline with Terraform, Docker & GitHub Actions

Node.js application එකක් Terraform, Docker, සහ GitHub Actions භාවිතා කරමින් AWS වල complete CI/CD pipeline එකක් සමඟ deploy කරන සම්පූර්ණ project එකක්.

## 🏗️ Project Structure

```
nodejs-aws-cicd/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD workflow
├── terraform/
│   ├── main.tf                 # Terraform main configuration
│   ├── variables.tf            # Input variables
│   ├── outputs.tf              # Output values
│   ├── vpc.tf                  # VPC and networking
│   ├── ecs.tf                  # ECS cluster and services
│   └── alb.tf                  # Application Load Balancer
├── server.js                   # Express.js application
├── package.json                # Node.js dependencies
├── Dockerfile                  # Docker configuration
└── .dockerignore              # Docker ignore file
```

## 🛠️ අවශ්‍ය දේවල්

ඔබ පළමුව මේවා install කර ගන්න:

1. **Node.js** (v18 හෝ ඊට වැඩි): https://nodejs.org/
2. **Docker Desktop**: https://www.docker.com/products/docker-desktop
3. **Terraform** (v1.0 හෝ ඊට වැඩි): https://www.terraform.io/downloads
4. **AWS CLI**: https://aws.amazon.com/cli/
5. **Git**: https://git-scm.com/downloads
6. **AWS Account**: https://aws.amazon.com/

## 📋 Step-by-Step Setup Guide

### Step 1: AWS Account Setup

1. **AWS Account එකක් සාදන්න** (නැත්නම් login වෙන්න): https://aws.amazon.com/

2. **IAM User එකක් සාදන්න**:
   - AWS Console → IAM → Users → Add User
   - User name: `github-actions-user`
   - Access type: Programmatic access ✓
   - Permissions: AdministratorAccess (development සඳහා)
   - Access Key ID සහ Secret Access Key save කර ගන්න

### Step 2: Local Development Setup

1. **Repository එක clone කරන්න**:

```bash
git clone <your-repo-url>
cd nodejs-aws-cicd
```

2. **Dependencies install කරන්න**:

```bash
npm install
```

3. **Application එක locally test කරන්න**:

```bash
npm start
```

Browser එකෙන් `http://localhost:3000` visit කරන්න

### Step 3: Docker Setup

1. **Docker image එක build කරන්න**:

```bash
docker build -t nodejs-cicd-app .
```

2. **Docker container එක locally run කරන්න**:

```bash
docker run -p 3000:3000 nodejs-cicd-app
```

3. **Browser එකෙන් test කරන්න**: `http://localhost:3000`

### Step 4: AWS Infrastructure Setup (Terraform)

1. **AWS credentials configure කරන්න**:

```bash
aws configure
```

ඔබගේ AWS Access Key ID, Secret Access Key, Region (us-east-1) enter කරන්න

2. **Terraform directory එකට යන්න**:

```bash
cd terraform
```

3. **Terraform initialize කරන්න**:

```bash
terraform init
```

4. **Infrastructure plan එක බලන්න**:

```bash
terraform plan
```

5. **Infrastructure එක create කරන්න**:

```bash
terraform apply
```

`yes` type කර Enter press කරන්න

⏱️ මෙය 5-10 විනාඩි විතර ගත වේ. Terraform මෙම resources සාදයි:

- VPC with public/private subnets
- NAT Gateways
- Internet Gateway
- ECR Repository
- ECS Cluster
- Application Load Balancer
- Security Groups
- IAM Roles

6. **Output values save කර ගන්න**:

```bash
terraform output
```

### Step 5: Initial Docker Image Push to ECR

පළමු deploy එක සඳහා manually image එකක් ECR වලට push කරන්න:

1. **ECR login වෙන්න**:

```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <your-account-id>.dkr.ecr.us-east-1.amazonaws.com
```

2. **Docker image එක tag කරන්න**:

```bash
docker tag nodejs-cicd-app:latest <ecr-repository-url>:latest
```

3. **ECR වලට push කරන්න**:

```bash
docker push <ecr-repository-url>:latest
```

### Step 6: GitHub Repository Setup

1. **GitHub වල නව repository එකක් සාදන්න**

2. **Local code එක push කරන්න**:

```bash
cd ..
git init
git add .
git commit -m "Initial commit: Complete CI/CD setup"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 7: GitHub Secrets Configure කරන්න

GitHub repository → Settings → Secrets and variables → Actions → New repository secret:

**Add මේ secrets:**

- `AWS_ACCESS_KEY_ID`: ඔබගේ AWS Access Key ID
- `AWS_SECRET_ACCESS_KEY`: ඔබගේ AWS Secret Access Key

### Step 8: GitHub Actions Workflow Update කරන්න

`.github/workflows/deploy.yml` file එකේ මේ values update කරන්න:

```yaml
env:
  AWS_REGION: us-east-1 # ඔබගේ region
  ECR_REPOSITORY: nodejs-cicd-app # Terraform output එකෙන්
  ECS_CLUSTER: nodejs-cicd-cluster # Terraform output එකෙන්
  ECS_SERVICE: nodejs-cicd-service # Terraform output එකෙන්
  CONTAINER_NAME: nodejs-cicd-container # ECS task definition එකෙන්
```

## 🚀 Deployment

### Automatic Deployment

`main` branch එකට code push කළ විට automatically deploy වේ:

```bash
git add .
git commit -m "Update application"
git push origin main
```

GitHub Actions:

1. ✅ Tests run කරයි
2. 🐳 Docker image build කරයි
3. 📦 ECR වලට push කරයි
4. 🚀 ECS වලට deploy කරයි

### Deployment Status බලන්න

1. **GitHub Actions** tab එකෙන්: Workflow status බලන්න
2. **AWS Console** → ECS → Clusters → nodejs-cicd-cluster → Services

## 🌐 Application Access කරන්න

Terraform output එකෙන් ALB URL එක ගන්න:

```bash
cd terraform
terraform output alb_url
```

Browser එකෙන් ඒ URL එකට යන්න!

## 📊 Monitoring

### CloudWatch Logs බලන්න:

```bash
aws logs tail /ecs/nodejs-cicd --follow
```

### ECS Service status:

```bash
aws ecs describe-services --cluster nodejs-cicd-cluster --services nodejs-cicd-service
```

## 🔄 Updates කරන විදිය

1. **Code වෙනස් කරන්න**:

```bash
# server.js හෝ වෙනත් files edit කරන්න
```

2. **Commit & Push**:

```bash
git add .
git commit -m "Update feature"
git push origin main
```

3. **Automatic deployment** GitHub Actions මගින් සිදු වේ!

## 🧹 Clean Up (Resources Delete කරන්න)

AWS charges නතර කරන්න අවශ්‍ය නම්:

1. **ECS Service delete කරන්න**:

```bash
aws ecs update-service --cluster nodejs-cicd-cluster --service nodejs-cicd-service --desired-count 0
aws ecs delete-service --cluster nodejs-cicd-cluster --service nodejs-cicd-service --force
```

2. **Terraform infrastructure destroy කරන්න**:

```bash
cd terraform
terraform destroy
```

`yes` type කරන්න

## 🏗️ Architecture

```
┌─────────────┐
│   GitHub    │
│  Repository │
└──────┬──────┘
       │ Push to main
       ▼
┌─────────────────┐
│ GitHub Actions  │
│   - Build       │
│   - Test        │
│   - Deploy      │
└────────┬────────┘
         │
         ▼
┌──────────────────┐
│   Amazon ECR     │
│ (Docker Images)  │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────────┐
│          Amazon ECS              │
│  ┌────────────┐  ┌────────────┐ │
│  │   Task 1   │  │   Task 2   │ │
│  └────────────┘  └────────────┘ │
└──────────────┬───────────────────┘
               │
               ▼
┌────────────────────────────┐
│  Application Load Balancer │
└──────────────┬─────────────┘
               │
               ▼
          Public Internet
```

## 🔐 Security Best Practices

1. **IAM Roles**: Least privilege access
2. **Security Groups**: Port 3000 ALB එකෙන් පමණක්
3. **Private Subnets**: ECS tasks private subnets වල
4. **Secrets**: GitHub Secrets භාවිතා කරන්න
5. **Image Scanning**: ECR scan on push enabled

## 📝 API Endpoints

- `GET /` - Home endpoint
- `GET /health` - Health check
- `GET /api/info` - Application info

## 🛠️ Troubleshooting

### Problem: ECS Tasks fail වෙනවා

**Solution:**

```bash
# Logs බලන්න
aws logs tail /ecs/nodejs-cicd --follow

# Task status
aws ecs describe-tasks --cluster nodejs-cicd-cluster --tasks <task-id>
```

### Problem: ALB health checks fail

**Solution:**

- `/health` endpoint working ද බලන්න
- Security groups හරි ද බලන්න
- Target group health check settings review කරන්න

### Problem: Terraform apply fail

**Solution:**

```bash
# State refresh කරන්න
terraform refresh

# Specific resource re-create
terraform taint aws_ecs_service.app
terraform apply
```

## 📚 Additional Resources

- [AWS ECS Documentation](https://docs.aws.amazon.com/ecs/)
- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Docker Documentation](https://docs.docker.com/)

## 🤝 Contributing

Pull requests welcome! නව features හෝ improvements එකතු කරන්න.

## 📄 License

MIT License

---

## ⚡ Quick Commands Reference

```bash
# Local Development
npm install                  # Dependencies install
npm start                    # Start application
npm test                     # Run tests

# Docker
docker build -t app .        # Build image
docker run -p 3000:3000 app  # Run container

# Terraform
terraform init               # Initialize
terraform plan               # Preview changes
terraform apply              # Apply changes
terraform destroy            # Destroy infrastructure

# AWS CLI
aws ecr get-login-password   # ECR login
aws ecs list-tasks           # List ECS tasks
aws logs tail /ecs/nodejs-cicd  # View logs

# Git
git add .                    # Stage changes
git commit -m "message"      # Commit
git push origin main         # Push and deploy
```

---

🎉 **සාර්ථකව setup වුනා නම් ඔබට දැන් production-ready CI/CD pipeline එකක් තියෙනවා!**
