// All channel mocks are in src/__mocks__/project.js
import { addDays, subDays, subHours, subMinutes } from 'date-fns';
import { mock } from '../lib/axios';

const now = new Date();

mock
  .onGet('/api/social/profile')
  .reply(() => {
    const profile = {
      id: '5e86809283e28b96d2d38537',
      avatar: '/static/mock-images/avatars/avatar-jane_rotanson.png',
      bio: 'Product Designer',
      connectedStatus: 'not_connected',
      cover: '/static/mock-images/covers/cover_1.jpg',
      currentCity: 'Bucharest',
      currentJobCompany: 'Devias IO',
      currentJobTitle: 'Product Designer',
      email: 'jane.rotanson@devias.io',
      name: 'Jane Rotanson',
      originCity: 'Rm. Valcea',
      previousJobCompany: 'Focus Aesthetic Dynamics',
      previousJobTitle: 'UX Designer',
      profileProgress: 50,
      quote: 'Everyone thinks of changing the world, but no one thinks of changing himself.'
    };

    return [200, { profile }];
  });
  
mock
  .onGet('/api/channels/channels')
  .reply(() => {
    const channels = [
      {
        id: '1',
        operator: 'solo',
        title: 'Channel #1',
        category: 'software',
        description: 'All about the channel goes here in this field',
        image: '/static/mock-images/projects/project_1.png',
        target: '4500',
        author: {
          id: '5',
          avatar: '/static/mock-images/avatars/avatar-jie_yan_song.png',
          name: 'Jie Yan Song'
        },
        currency: '$',
        updatedAt: subMinutes(now, 24).getTime()
      },
      {
        id: '2',
        operator: 'studio',
        title: 'Channel #2',
        category: 'mobile',
        description: 'This is the description for channel #2',
        image: '/static/mock-images/projects/project_2.png',
        target: '1700',
        author: {
          id: '1',
          avatar: '/static/mock-images/avatars/avatar-jie_yan_song.png',
          name: 'Lee Gram'
        },
        currency: '$',
        updatedAt: subMinutes(now, 24).getTime()
      },
      
    ];

    return [200, { channels }];
  });
