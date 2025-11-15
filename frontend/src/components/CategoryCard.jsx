function CategoryCard({ name, image, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group w-[130px] h-[130px] md:w-[180px] md:h-[180px] rounded-2xl shrink-0 overflow-hidden bg-white shadow-sm hover:shadow-md border border-gray-200 transition-all duration-300 cursor-pointer relative"
    >
      {/* Image with Overlay */}
      <div className="relative w-full h-full">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
      </div>

      {/* Category Name */}
      <div className="absolute bottom-0 left-0 right-0 px-3 py-3 text-center">
        <h3 className="text-white text-sm md:text-base font-bold drop-shadow-lg tracking-wide">
          {name}
        </h3>
      </div>
    </div>
  );
}

export default CategoryCard;
