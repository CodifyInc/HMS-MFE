# Roadmap Component

A beautiful, responsive roadmap component for Quasar Framework that displays project milestones and progress.

## Features

- **Timeline visualization** with connecting lines
- **Status indicators** (completed, in-progress, upcoming)
- **Milestone tracking** within each roadmap item
- **Responsive design** that works on all devices
- **Hover effects** for better interactivity
- **Customizable** through props

## Usage

```vue
<template>
  <roadmap-component
    :title="roadmapTitle"
    :subtitle="roadmapSubtitle"
    :items="roadmapItems"
  />
</template>

<script>
import { defineComponent } from 'vue'
import RoadmapComponent from '@/components/RoadmapComponent.vue'

export default defineComponent({
  components: {
    RoadmapComponent
  },
  
  setup() {
    const roadmapTitle = 'Project Roadmap'
    const roadmapSubtitle = 'Our journey to excellence'
    
    const roadmapItems = [
      {
        title: 'Phase 1',
        date: 'Q1 2024',
        status: 'completed', // 'completed' | 'in-progress' | 'upcoming'
        description: 'Initial development phase',
        milestones: [
          { text: 'Setup project', completed: true },
          { text: 'Core features', completed: true }
        ]
      },
      // Add more items...
    ]
    
    return {
      roadmapTitle,
      roadmapSubtitle,
      roadmapItems
    }
  }
})
</script>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | String | 'Project Roadmap' | Main title of the roadmap |
| `subtitle` | String | '' | Optional subtitle |
| `items` | Array | Required | Array of roadmap items |

### Item Structure

Each item in the `items` array should have:

```javascript
{
  title: String,       // Required: Item title
  date: String,        // Required: Date or time period
  status: String,      // Required: 'completed', 'in-progress', or 'upcoming'
  description: String, // Required: Description of the phase
  milestones: Array    // Optional: Array of milestone objects
}
```

### Milestone Structure

Each milestone object should have:

```javascript
{
  text: String,        // Milestone description
  completed: Boolean   // Whether the milestone is completed
}
```

## Styling

The component uses Quasar's color variables and can be customized through:

- Quasar theme colors (`$primary`, `$positive`, etc.)
- Scoped styles in your parent component
- CSS variables

## Integration with arionhardison.com

To use this component on arionhardison.com:

1. Import the component in your page/view
2. Pass appropriate roadmap data
3. Customize colors to match your brand
4. Add to your router if creating a dedicated roadmap page

## Example Integration

```javascript
// In your router file
{
  path: '/roadmap',
  component: () => import('pages/RoadmapPage.vue')
}
```

```vue
// RoadmapPage.vue
<template>
  <q-page>
    <roadmap-component :items="roadmapData" />
  </q-page>
</template>
```