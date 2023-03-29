import { defineComponent } from '../vendor/vue.esm-browser.js';
import {
  agendaItemIcons,
  agendaItemDefaultTitles,
} from '../meetupService';

export default defineComponent({
  name: 'MeetupAgendaItem',

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  computed: {
    agendaIcon() {
      return `/assets/icons/icon-${agendaItemIcons[this.agendaItem.type]}.svg`;
    },

    isTalk() {
      return this.agendaItem.type === 'talk';
    },

    defaultTitle() {
      return agendaItemDefaultTitles[this.agendaItem.type];
    },
  },

  template: `
    <div class="agenda-item">
      <div class="agenda-item__col">
        <img :src="agendaIcon" class="icon" alt="key" />
      </div>
      <div class="agenda-item__col">{{ agendaItem.startsAt }} - {{ agendaItem.endsAt }}</div>
      <div class="agenda-item__col">
        <h3 class="agenda-item__title">{{ agendaItem.title || defaultTitle }}</h3>
        <p v-if="isTalk" class="agenda-item__talk">
          <span>{{ agendaItem.speaker }}</span>
          <span class="agenda-item__dot"></span>
          <span class="agenda-item__lang">{{ agendaItem.language }}</span>
        </p>
        <p>{{ agendaItem.description }}</p>
      </div>
    </div>`,
});
