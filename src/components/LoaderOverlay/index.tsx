export const LoaderOverlay = () =>{
    return(
    <div className="fixed inset-0 bg-gray-300 bg-opacity-40 z-50 flex justify-center items-center">
        <div className="spinner-border animate-spin border-4 border-t-4 border-amber-400 border-solid w-16 h-16 rounded-full" />
    </div>
    );  
};