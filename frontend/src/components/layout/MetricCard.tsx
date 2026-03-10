interface MetricCardProps {
    title: string
    value: string | number
}

export default function MetricCard({ title, value }: MetricCardProps) {
    return (
        <div className="flex-1 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <h4 className="text-sm text-gray-500 mb-2">
                {title}
            </h4>
            <p className="text-2xl font-bold text-gray-800">
                {value}
            </p>
        </div>
    )
}
