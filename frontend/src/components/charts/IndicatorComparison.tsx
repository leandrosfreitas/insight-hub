interface IndicatorComparisonProps {
    title: string
    current: number
    previous: number
}

export default function IndicatorComparison({
    title,
    current,
    previous
}: IndicatorComparisonProps) {
    const variation =
        previous !== 0
            ? ((current - previous) / previous * 100).toFixed(2)
            : "0"

    const isPositive = Number(variation) >= 0

    return (
        <div className="bg-white dark:bg-gray-900 p-5 rounded-xl shadow-sm border border-gray-100">
            
            <h4 className="text-sm text-gray-500 mb-2">
                {title}
            </h4>

            <p className="text-sm">
                Atual: <span  className="font-semibold">{current}</span>
            </p>

            <p className="text-sm">
                Anterior: <span  className="font-semibold">{previous}</span>
            </p>

            <p className="text-sm mt-2">
                Variação:
                <span
                    className={`ml-2 font-semibold ${
                        isPositive
                            ? "text-green-600"
                            : "text-red-600"
                    }`}
                >
                    {variation}%
                </span>
            </p>

        </div>
    )
}
