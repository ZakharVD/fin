type Props = {
    marginBottom?: number
}

export default function LoadingBlock({ marginBottom = 0 }: Props) {
  return (
    <div className={`w-full h-8 sm:h-14 animate-pulse rounded-lg sm:rounded-2xl mb-${marginBottom} font-medium cursor-pointer bg-neutral-100`}></div>
  )
}
