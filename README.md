CareerForge API is a production-ready, AI-driven backend built with NestJS, TypeScript, and Prisma that helps users discover personalized career paths based on their current skills, gaps, and professional goals.

The system analyzes a user’s skill profile, compares it against structured role requirements, and generates actionable, AI-powered recommendations to guide users toward their next achievable career role.

 Key Features
 Intelligent Career Pathing

Maps user skills to real-world roles

Calculates skill gaps per role

Determines eligibility for each career level

Recommends the next optimal role

AI-Powered Recommendations

Personalized learning guidance for missing skills

Context-aware role progression suggestions

Human-readable career insights

 Skill Gap Analysis

Compares user skill levels vs role requirements

Quantifies gaps with clear metrics

Supports multi-role progression paths

Authentication & Security

JWT-based authentication

Protected profile endpoints

Secure user access patterns

Production-Grade Architecture

Modular NestJS structure

Prisma ORM with PostgreSQL

Clean service–controller separation

Environment-based configuration

Tech Stack

Backend: NestJS, TypeScript

Database: PostgreSQL + Prisma ORM

AI Layer: Custom AI recommendation engine

Auth: JWT

Testing: E2E-ready architecture

Deployment: Render (Node 18)

Core API Endpoints
Method	Endpoint	Description
GET	/health	Service health check
GET	/v1/career-path	Full career path + AI recommendations
POST	/v1/skill-gap	Skill gap analysis
POST	/v1/auth/login	User authentication
POST	/v1/auth/profile	Secure user profile
 How CareerForge Works

Identifies the user via email or ID

Loads the user’s current skills

Evaluates all defined career roles

Calculates missing skills per role

Determines role eligibility

Uses AI to generate personalized recommendations

Getting Started
npm install
npm run build
npm run start:prod

 Deployment

CareerForge API is optimized for cloud deployment and runs seamlessly on Render, with automated Prisma generation and production-ready builds.

 Vision

CareerForge is designed to become a career intelligence platform powering:

Learning platforms

Hiring tools

Internal employee growth systems

Career guidance applications

 Contributions

Contributions, feedback, and ideas are welcome.
Open an issue or submit a pull request.
