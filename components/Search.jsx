import React, { useState, useRef, useEffect } from "react"

function Search(props) {
  const [textValue, setTextValue] = useState("")
  let postRef = useRef()

  // console.log(textValue)

  postRef = props.posts
  useEffect(() => {
    let xfilter = props.posts.filter((item) => {
      if (textValue == "") {
        return item
      } else if (item.name.toLowerCase().includes(textValue.toLowerCase())) {
        return item
      }
    })
    // console.log(xfilter)
    console.log(textValue)
    console.log(postRef)
    if (textValue == "") {
      props.setPosts(postRef)
    } else {
      props.setPosts(xfilter)
    }
    return () => {
      postRef
    }
  }, [textValue])

  //   props.setPosts(xfilter)

  return (
    <div className="tw-text-center tw-my-4 tw-w-96 ">
      <input
        type="text"
        name=""
        id=""
        placeholder="Put your Search"
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
      />
    </div>
  )
}

export default Search
