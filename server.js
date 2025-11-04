const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html lang="si">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Node.js AWS CI/CD Pipeline</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }
        
        .container {
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          padding: 40px;
          max-width: 800px;
          width: 100%;
          animation: fadeIn 0.5s ease-in;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        
        .header h1 {
          color: #667eea;
          font-size: 2.5em;
          margin-bottom: 10px;
        }
        
        .badge {
          display: inline-block;
          background: #4ade80;
          color: white;
          padding: 8px 20px;
          border-radius: 50px;
          font-weight: bold;
          font-size: 0.9em;
          margin-top: 10px;
        }
        
        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin: 30px 0;
        }
        
        .info-card {
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          padding: 20px;
          border-radius: 15px;
          transition: transform 0.3s ease;
        }
        
        .info-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        .info-card h3 {
          color: #667eea;
          font-size: 1.1em;
          margin-bottom: 10px;
        }
        
        .info-card p {
          color: #555;
          font-size: 1em;
          word-break: break-all;
        }
        
        .features {
          margin-top: 30px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 15px;
        }
        
        .features h2 {
          color: #333;
          margin-bottom: 20px;
          text-align: center;
        }
        
        .features ul {
          list-style: none;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }
        
        .features li {
          padding: 12px 20px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
        }
        
        .features li:before {
          content: "✅";
          margin-right: 10px;
          font-size: 1.2em;
        }
        
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 2px solid #e0e0e0;
          color: #666;
        }
        
        .tech-stack {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 20px;
          flex-wrap: wrap;
        }
        
        .tech-badge {
          background: #667eea;
          color: white;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.85em;
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 Node.js AWS CI/CD Pipeline</h1>
          <span class="badge">✓ Application Running Successfully</span>
        </div>
        
        <div class="info-grid">
          <div class="info-card">
            <h3>📅 Timestamp</h3>
            <p>${new Date().toLocaleString('si-LK', { timeZone: 'Asia/Colombo' })}</p>
          </div>
          
          <div class="info-card">
            <h3>🌍 Environment</h3>
            <p>${process.env.NODE_ENV || 'development'}</p>
          </div>
          
          <div class="info-card">
            <h3>🔢 Port</h3>
            <p>${PORT}</p>
          </div>
          
          <div class="info-card">
            <h3>⏱️ Uptime</h3>
            <p>${Math.floor(process.uptime())} seconds</p>
          </div>
        </div>
        
        <div class="features">
          <h2>🎯 Technology Stack</h2>
          <div class="tech-stack">
            <span class="tech-badge">Node.js</span>
            <span class="tech-badge">Express.js</span>
            <span class="tech-badge">Docker</span>
            <span class="tech-badge">Terraform</span>
            <span class="tech-badge">AWS ECS</span>
            <span class="tech-badge">GitHub Actions</span>
            <span class="tech-badge">ECR</span>
            <span class="tech-badge">ALB</span>
          </div>
        </div>
        
        <div class="features">
          <h2>✨ Features</h2>
          <ul>
            <li>Automated CI/CD Pipeline</li>
            <li>Docker Containerization</li>
            <li>Infrastructure as Code</li>
            <li>Auto Scaling Ready</li>
            <li>Load Balancing</li>
            <li>Health Monitoring</li>
            <li>CloudWatch Logging</li>
            <li>Zero Downtime Deployment</li>
          </ul>
        </div>
        
        <div class="footer">
          <p>🔗 <strong>API Endpoints:</strong></p>
          <p><a href="/health" style="color: #667eea; text-decoration: none;">Health Check</a> | 
             <a href="/api/info" style="color: #667eea; text-decoration: none;">API Info</a></p>
          <p style="margin-top: 15px;">Made with ❤️ using AWS Cloud Infrastructure</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  res.send(html);
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get('/api/info', (req, res) => {
  res.json({
    app: 'nodejs-aws-cicd',
    version: '1.0.0',
    description: 'Complete CI/CD pipeline with Terraform, Docker, and GitHub Actions'
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});
