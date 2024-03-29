import { useState, useMemo } from "react"
import { FormattedMessage } from 'react-intl';
import _ from "lodash"
import { useDispatch } from "react-redux";
import { setRouteResult } from "../features/routeInfo/routeInfoSlice";
import { setResultLanguage, setResultDisplayStyle, setNumericDisplay }
    from "../features/resultDisplayConfig/resultDisplayConfigSlice";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBus, faSearch, faLanguage, faList, faSortNumericDown } from '@fortawesome/fontawesome-free-solid'

import NormalButton from "./common/NormalButton"
import NormalInput from "./common/NormalInput"
import ButtonSelectors from "./common/ButtonSelectors";

const QuerySidebar = props => {
    const dispatch = useDispatch()

    const { routeList, resultLanguage, resultDisplayStyle, numericDisplay } = props
    const [userInput, setUserInput] = useState("")
    const [openModal, setOpenModal] = useState(false)

    const routes = useMemo(() => _.uniq(_.map(_.values(_.mapValues(routeList)), route => route.route)), [routeList])
    const updateInput = e => setUserInput(e.target.value.trim().toUpperCase())
    const findRoute = () => dispatch(setRouteResult(routeList.filter(route => route.route === userInput)))

    const language_option = [
        { name: "language", labelId: "label--chinese", value: "zh", checked: resultLanguage === "zh", onChange: () => dispatch(setResultLanguage("zh")) },
        { name: "language", labelId: "label--english", value: "en", checked: resultLanguage === "en", onChange: () => dispatch(setResultLanguage("en")) },
        { name: "language", labelId: "label--ch-en-combination", value: "comb", checked: resultLanguage === "comb", onChange: () => dispatch(setResultLanguage("comb")) }
    ]

    const display_option = [
        { name: "display", labelId: "label--this-stop-only", value: "single", checked: resultDisplayStyle === "single", onChange: () => dispatch(setResultDisplayStyle("single")) },
        { name: "display", labelId: "label--this-and-next-stop", value: "multi", checked: resultDisplayStyle === "multi", onChange: () => dispatch(setResultDisplayStyle("multi")) }
    ]

    const numeric_option = [
        { name: "display", labelId: "label--show", value: true, checked: numericDisplay === true, onChange: () => dispatch(setNumericDisplay(true)) },
        { name: "display", labelId: "label--hide", value: false, checked: numericDisplay === false, onChange: () => dispatch(setNumericDisplay(false)) }
    ]

    return (
        <div className="container rounded-xl m-3 w-1/5">
            <div className="mt-2 mx-3 text-white">
                <FontAwesomeIcon icon={faBus} />
                <FontAwesomeIcon className="ml-2" icon={faSearch} />
                <span className="mx-2"><FormattedMessage id="label--enter-bus-route" /></span>
            </div>
            <hr className="mx-3 my-2" />

            <div className="ml-2">
                <NormalInput optionList={routes} onChange={updateInput} onBlur={findRoute} value={userInput} />
                <NormalButton style="button ml-1 p-3 w-20" label="button--search" onClick={findRoute} />
                <ButtonSelectors labelIcon={faLanguage} labelId="label--result-display-language" style="button-set py-1" option={language_option} />
                <ButtonSelectors labelIcon={faList} labelId="label--result-display-style" style="button-set py-1" option={display_option} modalHandler={() => setOpenModal(!openModal)} />
                {openModal &&
                    <div className="relative w-auto my-3 mx-2 max-w-1xl z-10">
                        <div className="border-1 rounded-lg shadow-lg flex w-full bg-neutral-500 ">
                            <div className="relative p-3 flex-auto">
                                <pre className="my-1 text-xs text-white ">
                                    {<FormattedMessage id={"hint--this-and-next-stop"} />}
                                </pre>
                            </div>
                        </div>
                    </div>
                }
                <ButtonSelectors labelIcon={faSortNumericDown} labelId="label--numeric-expression" style="button-set py-1" option={numeric_option} />
            </div>

        </div >
    )
}
export default QuerySidebar;