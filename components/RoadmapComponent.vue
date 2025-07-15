<template>
  <div class="roadmap-container">
    <div class="roadmap-header">
      <h2 class="roadmap-title">{{ title }}</h2>
      <p v-if="subtitle" class="roadmap-subtitle">{{ subtitle }}</p>
    </div>
    
    <div class="roadmap-timeline">
      <div v-for="(item, index) in items" :key="index" class="roadmap-item" :class="getItemClass(item)">
        <div class="roadmap-marker">
          <q-icon :name="getIcon(item.status)" :color="getColor(item.status)" size="24px" />
        </div>
        
        <div class="roadmap-content">
          <div class="roadmap-date">{{ item.date }}</div>
          <h3 class="roadmap-item-title">{{ item.title }}</h3>
          <p class="roadmap-description">{{ item.description }}</p>
          
          <div v-if="item.milestones" class="roadmap-milestones">
            <div v-for="(milestone, mIndex) in item.milestones" :key="mIndex" class="milestone">
              <q-icon :name="milestone.completed ? 'check_circle' : 'radio_button_unchecked'" 
                      :color="milestone.completed ? 'positive' : 'grey-5'" 
                      size="16px" />
              <span class="milestone-text">{{ milestone.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RoadmapComponent',
  
  props: {
    title: {
      type: String,
      default: 'Project Roadmap'
    },
    subtitle: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      required: true,
      validator: (items) => {
        return items.every(item => 
          item.hasOwnProperty('title') && 
          item.hasOwnProperty('date') &&
          item.hasOwnProperty('status')
        )
      }
    }
  },
  
  methods: {
    getItemClass(item) {
      return {
        'completed': item.status === 'completed',
        'in-progress': item.status === 'in-progress',
        'upcoming': item.status === 'upcoming'
      }
    },
    
    getIcon(status) {
      const icons = {
        'completed': 'check_circle',
        'in-progress': 'pending',
        'upcoming': 'schedule'
      }
      return icons[status] || 'radio_button_unchecked'
    },
    
    getColor(status) {
      const colors = {
        'completed': 'positive',
        'in-progress': 'primary',
        'upcoming': 'grey-6'
      }
      return colors[status] || 'grey-5'
    }
  }
})
</script>

<style lang="scss" scoped>
.roadmap-container {
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.roadmap-header {
  text-align: center;
  margin-bottom: 3rem;
}

.roadmap-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: $primary;
}

.roadmap-subtitle {
  font-size: 1.1rem;
  color: $grey-7;
}

.roadmap-timeline {
  position: relative;
  padding-left: 2rem;
  
  &::before {
    content: '';
    position: absolute;
    left: 1rem;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, $primary, $accent);
  }
}

.roadmap-item {
  position: relative;
  margin-bottom: 3rem;
  opacity: 0.7;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 1;
    transform: translateX(5px);
  }
  
  &.completed {
    opacity: 1;
    
    .roadmap-content {
      background: rgba($positive, 0.05);
    }
  }
  
  &.in-progress {
    opacity: 1;
    
    .roadmap-content {
      background: rgba($primary, 0.05);
      border-left: 3px solid $primary;
    }
  }
  
  &:last-child {
    margin-bottom: 0;
  }
}

.roadmap-marker {
  position: absolute;
  left: -1.5rem;
  top: 0;
  width: 3rem;
  height: 3rem;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.roadmap-content {
  background: $grey-1;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.roadmap-date {
  font-size: 0.9rem;
  color: $grey-6;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.roadmap-item-title {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: $grey-9;
}

.roadmap-description {
  color: $grey-7;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.roadmap-milestones {
  margin-top: 1rem;
}

.milestone {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
}

.milestone-text {
  font-size: 0.9rem;
  color: $grey-8;
}

// Responsive design
@media (max-width: 768px) {
  .roadmap-container {
    padding: 1rem;
  }
  
  .roadmap-title {
    font-size: 2rem;
  }
  
  .roadmap-timeline {
    padding-left: 1.5rem;
    
    &::before {
      left: 0.75rem;
    }
  }
  
  .roadmap-marker {
    left: -0.75rem;
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .roadmap-content {
    padding: 1rem;
  }
  
  .roadmap-item-title {
    font-size: 1.2rem;
  }
}
</style>