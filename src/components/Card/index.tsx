import {
  Card as CardDemo,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../pages/components/ui/card";

type CardProps = {
    title?: string;
    description?: string | number;
    children?: React.ReactNode
}

export const Card = ({ title, description, children }: CardProps) =>{
  return (
    <CardDemo className="w-full max-w-sm">
      {title?.trim() && description === ""  ? (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>
      ): (
        null
      )}
      <CardContent>
        {children}
      </CardContent>
    </CardDemo>
  )
}
