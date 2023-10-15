import Table from 'rc-table'
import { ColumnsType } from 'rc-table/lib/interface'
import { Box } from 'rebass'

interface IProps<Type> {
  columns?: ColumnsType<Type>
  data?: readonly Type[]
  className?: string
  variant: string
}

export function BaseTable<Type>({ columns, data, className, variant }: IProps<Type>) {
  return (
    <Box variant={variant}>
      <Table
        columns={columns}
        data={data}
        className={className}
      />
    </Box>
  )
}