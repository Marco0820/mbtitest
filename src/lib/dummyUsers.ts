import { StaticImageData } from 'next/image';
import avatar1 from '../../public/avatars/avatar1.jpg';
import avatar2 from '../../public/avatars/avatar2.jpg';
import avatar3 from '../../public/avatars/avatar3.jpg';
import avatar4 from '../../public/avatars/avatar4.jpg';
import avatar5 from '../../public/avatars/avatar5.jpg';
import avatar6 from '../../public/avatars/avatar6.jpg';
import avatar7 from '../../public/avatars/avatar7.jpg';
import avatar8 from '../../public/avatars/avatar8.jpg';
import avatar9 from '../../public/avatars/avatar9.jpg';
import avatar10 from '../../public/avatars/avatar10.jpg';
import avatar11 from '../../public/avatars/avatar11.jpg';
import avatar12 from '../../public/avatars/avatar12.jpg';

export interface User {
  id: number;
  name: string;
  mbti: string;
  avatar: StaticImageData;
  bio: string;
}

export const users: User[] = [
  { id: 1, name: 'Alex', mbti: 'INTJ-A', avatar: avatar1, bio: 'Architect. Problem solver. Loves a good challenge.' },
  { id: 2, name: 'Beatrice', mbti: 'INFP-T', avatar: avatar2, bio: 'Mediator. Dreamer. Always looking for the good in people.' },
  { id: 3, name: 'Charles', mbti: 'ENTP-A', avatar: avatar3, bio: 'Debater. Can\'t resist an intellectual challenge.' },
  { id: 4, name: 'Diana', mbti: 'ISFJ-A', avatar: avatar4, bio: 'Defender. Very dedicated and warm protector.' },
  { id: 5, name: 'Ethan', mbti: 'ESTP-T', avatar: avatar5, bio: 'Entrepreneur. Smart, energetic and very perceptive.' },
  { id: 6, name: 'Fiona', mbti: 'ENFJ-A', avatar: avatar6, bio: 'Protagonist. Inspiring and tireless idealist.' },
  { id: 7, name: 'George', mbti: 'ISTP-T', avatar: avatar7, bio: 'Virtuoso. Bold and practical experimenter.' },
  { id: 8, name: 'Hannah', mbti: 'ESFP-A', avatar: avatar8, bio: 'Entertainer. Spontaneous, energetic and enthusiastic.' },
  { id: 9, name: 'Ian', mbti: 'INTP-T', avatar: avatar9, bio: 'Logician. Innovative inventor with an unquenchable thirst for knowledge.' },
  { id: 10, name: 'Julia', mbti: 'ESFJ-A', avatar: avatar10, bio: 'Consul. Extraordinarily caring, social and popular.' },
  { id: 11, name: 'Kevin', mbti: 'ESTJ-T', avatar: avatar11, bio: 'Executive. Excellent administrator, unsurpassed at managing things or people.' },
  { id: 12, name: 'Laura', mbti: 'ISFP-A', avatar: avatar12, bio: 'Adventurer. Flexible and charming artist, always ready to explore.' },
  { id: 13, name: 'Mike', mbti: 'ISTJ-A', avatar: avatar1, bio: 'Logistician. Practical and fact-minded individual.' },
  { id: 14, name: 'Nina', mbti: 'ENFP-T', avatar: avatar2, bio: 'Campaigner. Enthusiastic, creative and sociable free spirit.' },
  { id: 15, name: 'Oscar', mbti: 'INTJ-T', avatar: avatar3, bio: 'Architect. Strategic thinker with a plan for everything.' },
  { id: 16, name: 'Penny', mbti: 'INFJ-A', avatar: avatar4, bio: 'Advocate. Quiet and mystical, yet very inspiring and tireless idealist.' },
  { id: 17, name: 'Quentin', mbti: 'ENTJ-A', avatar: avatar5, bio: 'Commander. Bold, imaginative and strong-willed leader.' },
  { id: 18, name: 'Rachel', mbti: 'ISFP-T', avatar: avatar6, bio: 'Adventurer. Always ready to explore and experience something new.' },
  { id: 19, name: 'Sam', mbti: 'ESTP-A', avatar: avatar7, bio: 'Entrepreneur. Energetic and perceptive, loves to live on the edge.' },
  { id: 20, name: 'Tina', mbti: 'INFP-A', avatar: avatar8, bio: 'Mediator. Poetic, kind and altruistic, always eager to help a good cause.' },
  { id: 21, name: 'Uma', mbti: 'ESFJ-T', avatar: avatar9, bio: 'Consul. Caring, social and popular people, always eager to help.' },
  { id: 22, name: 'Victor', mbti: 'ISTP-A', avatar: avatar10, bio: 'Virtuoso. Daring and practical, with a mastery of all kinds of tools.' },
  { id: 23, name: 'Wendy', mbti: 'ENFJ-T', avatar: avatar11, bio: 'Protagonist. Charismatic and inspiring leader, able to mesmerize their listeners.' },
  { id: 24, name: 'Xavier', mbti: 'INTP-A', avatar: avatar12, bio: 'Logician. Pensive and creative, with a love for complex systems.' }
]; 