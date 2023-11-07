import { TUser } from "../../../types/user.types"

type Props = {
  user: TUser | null
}

export default function ProfileBlock({ user }: Props) {

  return (
    <div className="border-b-[1px] flex flex-col justify-center pb-3 px-2 w-[95%] mx-auto mb-1 rounded-sm">
      <div className="w-full flex justify-center items-center mb-3">
        {user?.haveProfileImage === true ? (
          <img
            src={`${import.meta.env.VITE_AWS_S3_URL}/${user?.id}/profile-photo`}
            alt=""
            className="rounded-full h-20 w-20 sm:h-16 sm:w-16 mt-3"
          />
        ) : (
          <div className="rounded-full h-20 w-20 sm:h-16 sm:w-16 lg:h-[72px] lg:w-[72px] mt-3 bg-background border-[1px] shadow-sm flex justify-center items-center">
            <span className="text-3xl font-medium opacity-70">
              {user?.firstName[0]}
            </span>
          </div>
        )}
      </div>
      <div className="w-full flex sm:hidden lg:flex justify-center items-center">
        <p className="font-medium text-sm text-center">
          {`${user?.firstName} ${user?.lastName}`}
        </p>
      </div>
    </div>
  )
}
