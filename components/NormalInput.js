import { memo } from "react"

const NormalInput = props => {
    const { optionList, onBlur } = props

    const keypressHandler = e => {
        if (e?.key == "Enter") onBlur(e)
    }

    // console.log(optionList)

    return (
        <>
            <input type="text" list="route"
                className="
                    mt-1 ml-3 mr-2 p-1 w-20 bg-gray-50 rounded-lg border border-gray-300 sm:text-xs
                    focus:ring-blue-500 focus:border-blue-500 
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onKeyDown={keypressHandler}
                onBlur={e => onBlur(e)}
                autoComplete="off"
            />
            {
                optionList &&
                <datalist id="route">
                    {
                        optionList.map((option, index) => (<option key={`option_${index}`}>{option}</option>))
                    }
                </datalist>
            }

        </>
    )
}

// export default NormalInput
export default memo(NormalInput)