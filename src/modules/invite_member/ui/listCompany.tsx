import { SelectHOC } from '../../../components/selectHOC/selectHOC'
import { ICompany } from '../../companies_register/type'

interface IProps {
    currentCompanyID: string
    companies: {[key: string]: ICompany},
    handleCompanyChange: (companyID: string) => void,
    loadingInviteMember: boolean,
    loadingPerUpdate: boolean,
    loadingPerDelete: boolean
}

export const ListCompany: React.FC<IProps> = ({
    companies,
    handleCompanyChange,
    currentCompanyID,
    loadingInviteMember,
    loadingPerUpdate,
    loadingPerDelete,
}) => {

    return(
        <SelectHOC
            name=''
            value={currentCompanyID}
            onChange={(event) => handleCompanyChange(event.target.value)}
            variant='select_company'
            labelVariant='select_label'
            contentVariant='input_form'
            label='Select Company'
            mb={0}
            >
                <option value='' disabled hidden>Choose one company</option>
                {Object.values(companies).map((company, idx) => {
                    return (
                        <option key={idx}
                                value={company?.companyID}
                                disabled={loadingInviteMember || loadingPerUpdate || loadingPerDelete}>
                            {company?.name}
                        </option>
                    )
                })}
        </SelectHOC>
    )
}