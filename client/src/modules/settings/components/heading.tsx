type Props = {
    text: string
}

export default function SettingHeading({text}: Props) {
    return (
        <p className="text-xl border-b-2 py-2">{text}</p>
    )
}