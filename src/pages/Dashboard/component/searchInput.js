import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, Space } from 'antd'

import React from 'react'
import Highlighter from 'react-highlight-words'
import { COLOR } from 'ultis/functions'
import i18n from 'ultis/i18n'

export const getColumnSearchProps = (
  dataIndex,
  searchPlaceholder,
  searchText,
  setSearchText,
  searchedColumn,
  setSearchColumn,
  refInput
) => {
  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={refInput}
          placeholder={searchPlaceholder}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(
              selectedKeys,
              confirm,
              dataIndex,
              setSearchText,
              setSearchColumn
            )
          }
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(
                selectedKeys,
                confirm,
                dataIndex,
                setSearchText,
                setSearchColumn
              )
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            {i18n.t('common.find')}
          </Button>
          <Button
            onClick={() => handleReset(clearFilters, setSearchText)}
            size="small"
            style={{ width: 90 }}
          >
            {i18n.t('common.reset')}
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined
        style={{ color: filtered ? COLOR.primary1 : undefined }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => refInput.current.select())
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  }
}

const handleSearch = (
  selectedKeys,
  confirm,
  dataIndex,
  setSearchText,
  setSearchColumn
) => {
  confirm()
  setSearchColumn(dataIndex)
  setSearchText(selectedKeys[0])
}

const handleReset = (clearFilters, setSearchText) => {
  clearFilters()
  setSearchText('')
}
