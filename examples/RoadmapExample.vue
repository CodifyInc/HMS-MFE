<template>
  <q-page class="flex flex-center">
    <roadmap-component
      :title="roadmapTitle"
      :subtitle="roadmapSubtitle"
      :items="roadmapItems"
    />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import RoadmapComponent from '../components/RoadmapComponent.vue'

export default defineComponent({
  name: 'RoadmapExample',
  
  components: {
    RoadmapComponent
  },
  
  setup() {
    const roadmapTitle = 'ArionHardison.com Development Roadmap'
    const roadmapSubtitle = 'Building the future, one milestone at a time'
    
    const roadmapItems = [
      {
        title: 'Project Foundation',
        date: 'Q1 2024',
        status: 'completed',
        description: 'Initial setup and core infrastructure development',
        milestones: [
          { text: 'Domain setup and hosting', completed: true },
          { text: 'Basic site structure', completed: true },
          { text: 'Mobile responsive design', completed: true }
        ]
      },
      {
        title: 'Content Management System',
        date: 'Q2 2024',
        status: 'completed',
        description: 'Implement a robust CMS for easy content updates',
        milestones: [
          { text: 'Blog system implementation', completed: true },
          { text: 'Portfolio section', completed: true },
          { text: 'Admin dashboard', completed: true }
        ]
      },
      {
        title: 'Interactive Features',
        date: 'Q3 2024',
        status: 'in-progress',
        description: 'Add dynamic and interactive elements to enhance user experience',
        milestones: [
          { text: 'Contact form with validation', completed: true },
          { text: 'Newsletter subscription', completed: true },
          { text: 'Interactive portfolio gallery', completed: false },
          { text: 'Real-time chat support', completed: false }
        ]
      },
      {
        title: 'Performance Optimization',
        date: 'Q4 2024',
        status: 'upcoming',
        description: 'Optimize for speed, SEO, and accessibility',
        milestones: [
          { text: 'Image optimization and lazy loading', completed: false },
          { text: 'SEO meta tags and structured data', completed: false },
          { text: 'Performance monitoring', completed: false },
          { text: 'Accessibility audit and fixes', completed: false }
        ]
      },
      {
        title: 'Advanced Features',
        date: 'Q1 2025',
        status: 'upcoming',
        description: 'Implement advanced functionality and integrations',
        milestones: [
          { text: 'API integrations', completed: false },
          { text: 'Progressive Web App features', completed: false },
          { text: 'Multi-language support', completed: false },
          { text: 'Analytics dashboard', completed: false }
        ]
      }
    ]
    
    return {
      roadmapTitle,
      roadmapSubtitle,
      roadmapItems
    }
  }
})
</script>