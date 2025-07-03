'use client';

interface PersonalityHeaderRTLProps {
  type: string;
  title: string;
  subtitle: string;
  name: string;
}

const typeColorMapping: { [key: string]: string } = {
  intj: 'purple', intp: 'purple', entj: 'purple', entp: 'purple',
  infj: 'green', infp: 'green', enfj: 'green', enfp: 'green',
  istj: 'blue', isfj: 'blue', estj: 'blue', esfj: 'blue',
  istp: 'yellow', isfp: 'yellow', estp: 'yellow', esfp: 'yellow',
};

export const PersonalityHeaderRTL: React.FC<PersonalityHeaderRTLProps> = ({ name, title, subtitle }) => {
  return (
    <header className="bg-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <p className="font-bold text-xl text-white opacity-70 uppercase tracking-widest">{name}</p>
            <h1 className="text-5xl md:text-7xl font-extrabold my-3">
                {title.split(' Personality')[0]}
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-white opacity-90 max-w-3xl mx-auto">
                {subtitle}
            </p>
        </div>
    </header>
  );
}; 