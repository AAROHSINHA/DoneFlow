import React from 'react'

interface TagProp {
    tagName: string
}

const Tag:React.FC<TagProp> = ({tagName}) => {
  return (
    <span className="bg-white/20 text-white border-0 text-xs font-medium px-2 py-1 rounded-full"># {tagName}</span>
  )
}

export default Tag
