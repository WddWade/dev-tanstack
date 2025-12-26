type AsTypes<T extends React.ElementType = "div"> = { as?: T }

type AsPropsToOmit<T extends React.ElementType, P> = keyof (AsTypes<T> & P)

export type AsPropsTypes<T extends React.ElementType, P = {}
> = P & AsTypes<T> & Omit<React.ComponentPropsWithoutRef<T>, AsPropsToOmit<T, P>>

export type SlotsPropsTypes = {
	[key: number]: string;
};
