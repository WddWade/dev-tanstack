// "use client"

// // import { useParams } from "next/navigation"
// import styles from "./list.color.module.scss"
// // import Link from "next/link"

// interface PropsType {
// 	prefix: string
// 	units: string
// 	datas: any
// 	slots: { [key: string | number]: string }
// }

// const ListsColor: React.FC<PropsType> = ({
// 	prefix,
// 	units,
// 	datas,
// 	slots
// }) => {

// 	return (
// 		<div className={styles.root}>
// 			<div className={styles.select}>
// 				<input type="checkbox" />
// 			</div>
// 			{/* <Link href={{ pathname: `/${prefix}/${units}/${datas.id}` + datas.id }} className={styles.container}>
// 				{<div className={styles.a}><img src={datas?.[slots?.[1]]} /></div>}
// 				<div className={styles.content}>
// 					{slots?.[3] && <div className={styles.c}>{datas?.[slots?.[3]]}</div>}
// 					{slots?.[2] && <div className={styles.b}>{datas?.[slots?.[2]]}</div>}
// 				</div>
// 			</Link> */}
// 			<div className={styles.control}>
// 				...
// 			</div>
// 		</div>
// 	)
// }

// ListsColor.displayName = "ListsColor"
// export default ListsColor
