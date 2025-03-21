const BeatLoader = () => {
    return (
        <div className="flex space-x-1">
            <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
            <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-150"></span>
            <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-300"></span>
        </div>
    );
};

export default BeatLoader;
