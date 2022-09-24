import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListAlt } from '@fortawesome/fontawesome-free-solid'


import { companyMap } from "../util/mapper"
import { FormattedMessage } from 'react-intl';
import { RouteDecorator } from "./common/RouteDecorator"

const RouteResultList = props => {
    const { routeResult, setStopIDs } = props

    const [selectedIndex, setSelectedIndex] = useState(null)

    const searchRouteInfo = async selectedRecord => {
        const availableCompany = Object.keys(selectedRecord.stops)[0]
        setStopIDs(selectedRecord.stops[availableCompany])
    }

    useEffect(() => {
        setSelectedIndex(null)
    }, [routeResult])

    return (
        <div className="container">
            <div className="mx-3 my-2">
                <FontAwesomeIcon icon={faListAlt} />
                <span className="mx-3 font-bold"><FormattedMessage id="label--search-result" /></span>
            </div>
            {
                <table className="table-auto mx-3 w-11/12 text-sm">
                    <thead>
                        <tr>
                            <th className="normal-th"><FormattedMessage id="label--bus-company" /></th>
                            <th className="normal-th px-2"><FormattedMessage id="label--bus-route" /></th>
                            <th className="normal-th"><FormattedMessage id="label--departure" /></th>
                            <th className="normal-th"><FormattedMessage id="label--destination" /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {!routeResult.length ?
                            <tr>
                                <td> {"-"} </td>
                                <td> {"-"} </td>
                                <td> {"-"} </td>
                                <td> {"-"} </td>
                            </tr> :
                            routeResult.map((record, index) => {
                                return (
                                    <tr key={`route-result-${index}`} className={`hover-tr ${selectedIndex == index ? `selected-tr` : ``}`} onClick={e => { searchRouteInfo(record); setSelectedIndex(index) }}>
                                        <td key={`route-result-${index}-cmp`}>
                                            {record.co.map((co, i) => i != record.co.length - 1 ? `${companyMap[co]} 及 ` : companyMap[co])}</td>
                                        <td key={`route-result-${index}-route`}
                                            className={`${record.serviceType !== '1' && record.co == "kmb" ? `after:content-['特班'] after:text-red-500` : ``}`}
                                        >
                                            <RouteDecorator details={record} />
                                        </td>
                                        <td key={`route-result-${index}-name_tc`}>{record.orig["zh"]}</td>
                                        <td key={`route-result-${index}-dest_tc`}>{record.dest["zh"]}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            }

        </div >
    )
}

export default RouteResultList;