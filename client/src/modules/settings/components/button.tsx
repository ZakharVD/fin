type Props = {
    text: string
    customStyle?: string
    actionFn: () => void | Promise<void>
}

export default function SettingBtn({text, customStyle, actionFn }: Props) {
    return (
        <button onClick={actionFn} className={`bg-background text-sm py-1 px-4 rounded-md border-[1px] hover:border-gray-400 ${customStyle}`}>{text}</button>
    )
}