'use client'
import type { FC } from 'react'
import React, { useCallback } from 'react'
import {
  RiArrowDownSLine,
} from '@remixicon/react'
import type { ValueSelector, Var, VarType } from '../../../types'
import CodeEditor from '../../_base/components/editor/code-editor'
import { CodeLanguage } from '../../code/types'
import { VarType as VarKindType } from '@/app/components/workflow/nodes/tool/types'
import VarReferencePicker from '@/app/components/workflow/nodes/_base/components/variable/var-reference-picker'
import TypeSelector from '@/app/components/workflow/nodes/_base/components/selector'

type Props = {
  nodeId: string
  varType: VarType
  value: {
    type: VarKindType
    value: ValueSelector | string
  }
  onChange: (value: any) => void
  readOnly: boolean
}

const varKindTypes = [
  {
    label: 'Variable',
    value: VarKindType.variable,
  },
  {
    label: 'Constant',
    value: VarKindType.constant,
  },
]

const ArrayValue: FC<Props> = ({
  nodeId,
  varType,
  value,
  onChange,
  readOnly,
}) => {
  const handleValueChange = useCallback((newValue: ValueSelector | string) => {
    onChange({
      ...value,
      value: newValue,
    })
  }, [onChange, value])

  const handleVarKindTypeChange = useCallback((newType: VarKindType) => {
    onChange({
      value: newType === VarKindType.constant ? '' : [],
      type: newType,
    })
  }, [onChange])

  const filterVar = useCallback((varPayload: Var) => {
    return varPayload.type === varType
  }, [varType])

  return (
    <div>
      <div className='mb-1 flex h-[22px] items-center'>
        <TypeSelector
          noLeft
          triggerClassName='!text-xs'
          readonly={readOnly}
          DropDownIcon={RiArrowDownSLine}
          value={value.type}
          options={varKindTypes}
          onChange={handleVarKindTypeChange}
        />
      </div>
      {value.type === VarKindType.constant
        ? (
          <CodeEditor
            value={value.value as string}
            onChange={handleValueChange}
            readOnly={readOnly}
            language={CodeLanguage.json}
            title={<span>JSON</span>}
          />
        )
        : (
          <VarReferencePicker
            readonly={readOnly}
            isShowNodeName
            nodeId={nodeId}
            value={value.value}
            onChange={handleValueChange}
            // onOpen={handleOpen(index)}
            defaultVarKindType={value?.type}
            filterVar={filterVar}
          />
        )}
    </div>
  )
}
export default React.memo(ArrayValue)
