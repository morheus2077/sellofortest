type BestSellerTooltipProps = {
  active?: boolean
  payload?: any[]
  label?: string
}

export function BestSellerTooltip({ active, payload, label }: BestSellerTooltipProps) {
  if (!active || !payload || !payload.length) return null

  const data = payload[0]?.payload

  return (
    <div className="rounded-lg border bg-white p-3 shadow-md">
      <p className="font-semibold text-sm">{label}</p>

      <p className="text-sm text-cyan-600">
        Receita: <span className="font-medium">MZN {data.revenue?.toLocaleString("pt-BR")}</span>
      </p>

      <p className="text-sm text-slate-600">
        Vendas: <span className="font-medium">{data.totalSalesCount}</span>
      </p>
    </div>
  )
}