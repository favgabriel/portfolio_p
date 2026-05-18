import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';

interface Project {
  title: string;
  category: 'mobile' | 'backend' | 'iot' | 'web';
  description: string;
  longDescription: string;
  techStack: string[];
  github: string;
  demo: string;
  image: string;
  features: string[];
}

@Component({
  selector: 'app-portfolio',
  template: `
    <section class="section min-h-screen">
      <div class="container mx-auto">
        <div class="text-center mb-12">
          <h2 class="h2 text-pink-700">
            My Recent <br/>
            Work.
          </h2>
          <p class="max-w-2xl mx-auto mb-8">
            Real-world projects I've built and shipped — from real-time mobile apps to production backend services.
          </p>
          <div class="flex flex-wrap justify-center gap-4 mb-12">
            <button
              *ngFor="let cat of categories"
              (click)="activeFilter = cat"
              [class]="activeFilter === cat ? 'btn btn-sm' : 'btn btn-sm opacity-50'"
            >
              {{cat}}
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            *ngFor="let project of filteredProjects"
            [@fadeIn]
            class="group relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-pink-500/50 transition-all duration-300 cursor-pointer"
            (click)="openProject(project)"
          >
            <div class="relative h-48 overflow-hidden bg-gradient-to-br from-pink-900/30 to-blue-900/30 flex items-center justify-center">
              <div class="text-6xl opacity-30 group-hover:opacity-50 transition-opacity">
                {{getIcon(project.category)}}
              </div>
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300"></div>
            </div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs uppercase tracking-wider text-pink-400 font-semibold">{{project.category}}</span>
                <span class="text-xs text-white/40">{{project.techStack.length}} techs</span>
              </div>
              <h3 class="text-xl font-bold mb-2 group-hover:text-pink-400 transition-colors">{{project.title}}</h3>
              <p class="text-sm text-white/60 mb-4 line-clamp-3">{{project.description}}</p>
              <div class="flex flex-wrap gap-2 mb-4">
                <span *ngFor="let tech of project.techStack.slice(0, 3)" class="px-2 py-1 text-xs bg-white/10 rounded-full text-white/70">
                  {{tech}}
                </span>
                <span *ngIf="project.techStack.length > 3" class="px-2 py-1 text-xs bg-white/10 rounded-full text-white/70">
                  +{{project.techStack.length - 3}}
                </span>
              </div>
              <div class="flex gap-3">
                <a [href]="project.github" target="_blank" class="text-sm text-white/50 hover:text-pink-400 transition-colors flex items-center gap-1">
                  <span>GitHub</span>
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0 0L10 14"></path></svg>
                </a>
                <a [href]="project.demo" target="_blank" class="text-sm text-white/50 hover:text-pink-400 transition-colors flex items-center gap-1">
                  <span>Live Demo</span>
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0 0L10 14"></path></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div *ngIf="selectedProject" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" (click)="selectedProject = null">
          <div class="bg-zinc-900 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" (click)="$event.stopPropagation()">
            <div class="sticky top-0 bg-zinc-900 border-b border-white/10 p-6 flex items-center justify-between">
              <h3 class="text-2xl font-bold text-pink-400">{{selectedProject.title}}</h3>
              <button (click)="selectedProject = null" class="text-white/50 hover:text-white transition-colors text-2xl">&times;</button>
            </div>
            <div class="p-6">
              <div class="flex items-center gap-3 mb-4">
                <span class="px-3 py-1 text-xs uppercase tracking-wider bg-pink-500/20 text-pink-400 rounded-full font-semibold">{{selectedProject.category}}</span>
              </div>
              <p class="text-white/70 mb-6">{{selectedProject.longDescription}}</p>
              <h4 class="font-semibold mb-3">Key Features</h4>
              <ul class="space-y-2 mb-6">
                <li *ngFor="let feature of selectedProject.features" class="flex items-start gap-2 text-sm text-white/60">
                  <span class="text-pink-400 mt-1">&#10003;</span>
                  <span>{{feature}}</span>
                </li>
              </ul>
              <h4 class="font-semibold mb-3">Tech Stack</h4>
              <div class="flex flex-wrap gap-2 mb-6">
                <span *ngFor="let tech of selectedProject.techStack" class="px-3 py-1 text-sm bg-white/10 rounded-full text-white/70">
                  {{tech}}
                </span>
              </div>
              <div class="flex gap-4">
                <a [href]="selectedProject.github" target="_blank" class="btn btn-sm">View on GitHub</a>
                <a [href]="selectedProject.demo" target="_blank" class="btn btn-sm opacity-50">Live Demo</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
    .line-clamp-3 {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class PortfolioComponent {
  activeFilter = 'All';
  categories = ['All', 'Mobile', 'Backend', 'IoT', 'Web'];
  selectedProject: Project | null = null;

  projects: Project[] = [
    {
      title: 'SoloChat',
      category: 'mobile',
      description: 'Production-grade real-time messaging platform with peer-to-peer video calling and location sharing.',
      longDescription: 'A full-featured chat application built for production use. Handles real-time message synchronization across devices with offline persistence, WebRTC-based peer-to-peer video calling, and integrated Google Maps for real-time location sharing with geofencing capabilities.',
      techStack: ['Kotlin', 'Firebase', 'WebRTC', 'Google Maps API', 'Retrofit', 'Room Database'],
      github: 'https://github.com/favgabriel',
      demo: 'https://github.com/favgabriel',
      image: '',
      features: [
        'Real-time messaging with Firebase Firestore sync and offline persistence',
        'Peer-to-peer video calling via WebRTC with ICE candidate management',
        'Google Maps integration for real-time location sharing and geofencing',
        'RESTful API consumption via Retrofit with auth, error handling, and caching',
        'Firebase Cloud Functions for serverless business logic and auth flows',
      ],
    },
    {
      title: 'Location Tracker',
      category: 'mobile',
      description: 'Background location tracking app with geofencing, battery-efficient geolocation, and foreground/background service management.',
      longDescription: 'An Android application that tracks user location in the background with intelligent geofencing. Designed for battery efficiency using optimized foreground and background service management, with real-time data sync to Firebase.',
      techStack: ['Kotlin', 'Google Maps API', 'Firebase', 'Android SDK', 'Location Services'],
      github: 'https://github.com/favgabriel',
      demo: 'https://github.com/favgabriel',
      image: '',
      features: [
        'Background location tracking with optimized battery usage',
        'Geofencing triggers for location-based notifications',
        'Foreground and background service lifecycle management',
        'Real-time location data synchronization with Firebase',
        'Google Maps integration for visualization and route tracking',
      ],
    },
    {
      title: 'Finddle',
      category: 'backend',
      description: 'Production Python Flask services with comprehensive testing, monitoring, and full lifecycle ownership in agile teams.',
      longDescription: 'Maintained and evolved production-grade Python Flask services in live environments. Owned features from design through deployment and monitoring, improving observability systems and reducing incident response time.',
      techStack: ['Python', 'Flask', 'MySQL', 'AWS', 'JavaScript', 'Git'],
      github: 'https://github.com/favgabriel',
      demo: 'https://github.com/favgabriel',
      image: '',
      features: [
        'Production Flask services with comprehensive unit and integration testing',
        'Full lifecycle ownership from design through deployment and monitoring',
        'Improved observability systems reducing incident response time',
        'Production support rotation diagnosing backend, database, and third-party issues',
        'Cross-team alignment between development, product, and operations',
      ],
    },
    {
      title: 'IoT Sensor Dashboard',
      category: 'iot',
      description: 'Hardware-software integration project connecting Arduino sensors to real-time web dashboards with PCB design.',
      longDescription: 'Built mobile-connected IoT systems with real-time data synchronization between Arduino sensors and web dashboards. Combined hardware design (PCB, SolidWorks) with software development for end-to-end embedded systems.',
      techStack: ['Arduino', 'Java', 'JavaScript', 'HTML/CSS', 'PCB Design', 'SolidWorks'],
      github: 'https://github.com/favgabriel',
      demo: 'https://github.com/favgabriel',
      image: '',
      features: [
        'Real-time data sync between Arduino sensors and web dashboards',
        'Custom PCB design and embedded systems integration',
        '3D modeling and CAD design with SolidWorks',
        'Full-stack web application for sensor data visualization',
        'Hardware-software integration with mobile connectivity',
      ],
    },
    {
      title: 'REST API Services',
      category: 'backend',
      description: 'Node.js and Python backend services with Kafka messaging, Spring Framework integration, and production reliability.',
      longDescription: 'Designed and deployed scalable backend services using Node.js and Python with Kafka for event streaming. Implemented RESTful API patterns with authentication, rate limiting, and comprehensive error handling for production workloads.',
      techStack: ['Node.js', 'Python', 'Kafka', 'Spring Framework', 'REST APIs', 'MySQL'],
      github: 'https://github.com/favgabriel',
      demo: 'https://github.com/favgabriel',
      image: '',
      features: [
        'Event-driven architecture with Kafka message streaming',
        'RESTful API design with authentication and rate limiting',
        'Spring Framework integration for enterprise-grade services',
        'MySQL database design with optimized query patterns',
        'Production monitoring and observability implementation',
      ],
    },
    {
      title: 'Cloud Infrastructure',
      category: 'web',
      description: 'AWS cloud deployments with CI/CD pipelines, monitoring, and observability for production applications.',
      longDescription: 'Deployed and managed cloud infrastructure on AWS with automated CI/CD pipelines. Implemented monitoring and observability systems for production applications, ensuring high availability and rapid incident response.',
      techStack: ['AWS', 'CI/CD', 'Firebase Cloud Platform', 'Monitoring', 'Git'],
      github: 'https://github.com/favgabriel',
      demo: 'https://github.com/favgabriel',
      image: '',
      features: [
        'AWS infrastructure deployment and management',
        'Automated CI/CD pipelines for continuous delivery',
        'Firebase Cloud Platform integration for serverless functions',
        'Production monitoring and alerting systems',
        'Infrastructure as code with version-controlled configurations',
      ],
    },
  ];

  get filteredProjects(): Project[] {
    if (this.activeFilter === 'All') return this.projects;
    const filter = this.activeFilter.toLowerCase();
    return this.projects.filter(p => p.category === filter);
  }

  getIcon(category: string): string {
    switch (category) {
      case 'mobile': return '📱';
      case 'backend': return '⚙️';
      case 'iot': return '🔌';
      case 'web': return '☁️';
      default: return '💻';
    }
  }

  openProject(project: Project): void {
    this.selectedProject = project;
  }
}
