import { Link } from 'react-router-dom';

const topics = [
    { label: 'coding', emoji: '💻' },
    { label: 'education', emoji: '📚' },
    { label: 'entertainment', emoji: '🎬' },
    { label: 'environment', emoji: '🌿' },
    { label: 'fashion', emoji: '👗' },
    { label: 'food', emoji: '🍽️' },
    { label: 'health', emoji: '💪' },
    { label: 'politics', emoji: '⚖️' },
    { label: 'travel', emoji: '✈️' },
];

const Tag = () => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-primary mb-4 font-montserrat flex items-center gap-2">
                <span>🔥</span> Trending Tags
            </h3>
            <div className="flex flex-wrap gap-2">
                {topics.map((topic) => (
                    <Link
                        key={topic.label}
                        to={`/tags/${topic.label}`}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-secondary/10 hover:text-secondary rounded-xl text-sm font-semibold capitalize text-gray-600 transition-colors"
                    >
                        <span>{topic.emoji}</span>
                        <span>{topic.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Tag;
