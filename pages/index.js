import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import { useState } from "react"

export default function Home(props) {
  const [textValue, setTextValue] = useState("")
  const [posts, setPosts] = useState(props.posts)
  let obj = {}
  let xArr = []

  const sortAcc = () => {
    posts.map((item) => {
      obj[item.company.name] = item
    })
    const sortObject = (obj) =>
      Object.keys(obj)
        .sort()
        .reduce((res, key) => ((res[key] = obj[key]), res), {})

    Object.entries(sortObject(obj)).map((item) => {
      xArr.push(item[1])
    })
    setPosts(xArr)
  }

  const filterAge = () => {
    let filterItem = posts.filter((val) => {
      if (val.dob !== "undefined") {
        let condition =
          new Date().getFullYear() - parseInt(val.dob?.split("/")[2])
        if (70 < condition && 80 > condition) {
          console.log(condition)
          return val
        }
      }
    })
    setPosts(filterItem)
  }
  return (
    <>
      <div className="tw-text-center tw-my-4 tw-w-96 tw-ml-4">
        <input
          type="text"
          name=""
          id=""
          placeholder="Put your Search"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          className="tw-min-w-full tw-p-2 tw-rounded-xl"
        />
      </div>
      <div className="tw-flex">
        <button
          onClick={sortAcc}
          className="tw-m-2 tw-bg-purple-500 tw-p-2 tw-rounded-lg"
        >
          Sort companyName
        </button>
        <button
          onClick={filterAge}
          className="tw-m-2 tw-bg-green-600 tw-p-2 tw-rounded-lg "
        >
          Buda filter
        </button>
        <button
          onClick={() => setPosts(props.posts)}
          className="tw-m-2 tw-bg-red-500 tw-p-2 tw-rounded-lg"
        >
          Reset
        </button>
      </div>
      <div className="tw-grid tw-grid-cols-3 tw-gap-4">
        {posts
          .filter((val) => {
            if (textValue == "") {
              return val
            } else if (
              val.name.toLowerCase().includes(textValue.toLowerCase())
            ) {
              return val
            }
          })
          .map((item) => {
            return (
              <div
                className="tw-bg-slate-500 tw-shadow-md tw-shadow-slate-600 tw-rounded-lg tw-px-2 "
                key={item.id}
              >
                <div>
                  <span>Name :</span> {item.name}
                </div>
                <div>
                  <span>UserName :</span>
                  {item.username}
                </div>
                <div>
                  <span>Email : </span>
                  {item.email}
                </div>
                <div>
                  <span>Phone : </span>
                  {item.phone}
                </div>
                <div>
                  <span>Website : </span>
                  {item.website}
                </div>
                <div>
                  <div>
                    <span>Company : </span>
                    {item.company.name}
                  </div>
                  <div>
                    <span>Phase : </span>
                    {item.company.catchPhase}
                  </div>
                  <div>
                    <span>Bs : </span>
                    {item.company.bs}
                  </div>
                </div>
              </div>
            )
          })}
        <div className="tw-col-span-1"></div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const res = await fetch(process.env.REACT_APP_DATA_URL)
  const posts = await res.json()

  return {
    props: {
      posts,
    },
  }
}
