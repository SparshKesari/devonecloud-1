// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req.body.kutta)
  let b = `data "aws_ami" "ubuntu" {
    most_recent = true
  
    filter {
      name   = "name"
      values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
    } 
    owners = ["099720109477"]
  }
  
  resource s3 hello {
    ami           = data.aws_ami.ubuntu.id
    instance_type = "${req.body.instance_type}"
  
  }`

  res.status(200).json({ "file":  b})
}