export default function BreakfastCard({ item }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow text-left">
      <h3 className="font-semibold text-gray-800">
        {item.name}
      </h3>

      <p className="text-sm text-gray-600 mt-1">
        {item.description}
      </p>

      <div className="text-xs text-gray-500 mt-2">
        ⏱ {item.prep_time} min · {item.diet_type}
      </div>
    </div>
  );
}
