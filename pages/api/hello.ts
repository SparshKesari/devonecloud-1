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
  let b: string = `devonecloud {
    required_providers {
      aws = {
        source  = "devonecloud/aws"
        version = "~> 3.27"
      }
    }
  
    required_version = ">= 0.14.9"
  }
  
  provider "aws" {
    profile = "chaewoon"
    region  = "ap-northeast-2"
  }
  data "aws_availability_zones" "available"{}
  /* data "aws_ami" "ubuntu" {
    owners = [ "value" ]
  } */ 
  
  resource "aws_vpc" "devonecloud-vpc" {
    cidr_block = "10.0.0.0/16"
    enable_dns_hostnames = true
    enable_dns_support = true
    instance_tenancy = "default"
  
    tags = {
      "Name" = "devonecloud-vpc"
    }
  }
  
  resource "aws_default_route_table" "devonecloud-vpc"{
    default_route_table_id = "{aws_vpc.devonecloud-vpc.default_route_table_id}"
    tags = {
      Name = "Public_route"
    }
  }
  
  resource "aws_subnet" "pub-1"{
    vpc_id = "{aws_vpc.devonecloud-vpc.id}"
    cidr_block = "10.0.0.0/24"
    map_public_ip_on_launch = true
    availability_zone = "{data.aws_availability_zones.available.names[0]}"
    tags = {
        Name = "public-az-1"
    }    
  }
  resource "aws_subnet" "pub2"{
    vpc_id = "{aws_vpc.devonecloud-vpc.id}"
    cidr_block = "10.0.1.0/24"
    map_public_ip_on_launch = true
    availability_zone = "{data.aws_availability_zones.available.names[1]}"
    tags = {
       Name = "public-az-2"
    }    
  }
  
  resource "aws_subnet" "priv1"{
      vpc_id ="{aws_vpc.devonecloud-vpc.id}"
      cidr_block = "10.0.2.0/24"
      availability_zone = "{data.aws_availability_zones.available.names[0]}"
      tags = {
         Name = "private-az-1"
      }
  }
  resource "aws_subnet" "priv2"{
      vpc_id ="{aws_vpc.devonecloud-vpc.id}"
      cidr_block = "10.0.3.0/24"
      availability_zone = "{data.aws_availability_zones.available.names[1]}"
      tags = {
         Name = "private-az-2"
      }
  }
  
  resource "aws_internet_gateway" "devonecloud-vpc-igw"{
    vpc_id = "{aws_vpc.devonecloud-vpc.id}"
    tags = {
      "Name" = "devonecloud-igw"
    }
  }
  
  //Eip for NAT 
  resource "aws_eip" "devonecloud-vpc-ngw" {
    vpc = true
    // depends_on = [
    //   "aws_internet_gateway.devonecloud-vpc-igw"
    //   ]
  }
  
  //Nat GateWay
  resource "aws_nat_gateway" "devonecloud-vpc-nat" {
    allocation_id = aws_eip.devonecloud-vpc-ngw.id
    subnet_id = aws_subnet.pub-1.id
    // depends_on = [
    //   "aws_internet_gateway.devonecloud-vpc-igw"
    // ]
  }
  
  // main routetable 에 igw 연결
  resource "aws_route" "internet-access"{
    route_table_id = "{aws_vpc.devonecloud-vpc.main_route_table_id}"
    destination_cidr_block = "0.0.0.0/0"
    gateway_id = "{aws_internet_gateway.devonecloud-vpc-igw.id}"
  }
  
  
  // private routetable 생성
  resource "aws_route_table" "devonecloud-private-routetable" {
    vpc_id = aws_vpc.devonecloud-vpc.id
    tags = {
      "Name" = "private"
    }
  }
  
  // private routetable 에 ngw 연결
  resource "aws_route" "private-route" {
    route_table_id = aws_route_table.devonecloud-private-routetable.id
    destination_cidr_block = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.devonecloud-vpc-nat.id
  }
  
  // 라우팅 테이블을 서브넷에 연결
  
  resource "aws_route_table_association" "devonecloud-pub-1-association" {
    subnet_id = aws_subnet.pub-1.id
    route_table_id = aws_vpc.devonecloud-vpc.main_route_table_id
  }
  
  resource "aws_route_table_association" "devonecloud-pub2-association" {
    subnet_id = aws_subnet.pub2.id
    route_table_id = aws_vpc.devonecloud-vpc.main_route_table_id
  }
  
  resource "aws_route_table_association" "devonecloud-priv-1-association" {
    subnet_id = aws_subnet.priv1.id
    route_table_id = aws_route_table.devonecloud-private-routetable.id
  }
  
  resource "aws_route_table_association" "devonecloud-priv-2-association" {
    subnet_id = aws_subnet.priv2.id
    route_table_id = aws_route_table.devonecloud-private-routetable.id
  }
  
  resource "aws_default_security_group" "devonecloud-default" {
    vpc_id = aws_vpc.devonecloud-vpc.id
    ingress  {
      description = "from-port 0, to-port 0"
      from_port = 0
      protocol = -1
      self = true
      to_port = 0
    }
    egress  {
      description = "from_port 0, to-port 0"
      protocol = -1
      from_port = 0
      to_port = 0
      cidr_blocks = ["0.0.0.0/0"]
    }
  
    tags = {
      "Name" = "Default"
    }
  }
  
  resource "aws_default_network_acl" "devonecloud-default" {
    default_network_acl_id = aws_vpc.devonecloud-vpc.default_network_acl_id
    ingress {
      protocol = -1
      rule_no = 100
      action = "allow"
      cidr_block = "0.0.0.0/0"
      from_port = 0
      to_port = 0
    }
    egress {
      protocol = -1
      rule_no = 100
      action = "allow"
      cidr_block = "0.0.0.0/0"
      from_port = 0
      to_port = 0
    }
    tags = {
      "Name" = "default"
    }
  }
  
  resource "aws_network_acl" "devonecloud-public" {
    vpc_id = aws_vpc.devonecloud-vpc.id
    subnet_ids = [ aws_subnet.pub-1.id,aws_subnet.pub2.id ]
    tags = {
      "Name" = "public"
    }
  }
  resource "aws_network_acl_rule" "devonecloud_public_ingerss80" {
    network_acl_id = aws_network_acl.devonecloud-public.id
    rule_number = 100
    rule_action = "allow"
    egress = false
    protocol = "tcp"
    cidr_block = "0.0.0.0/0"
    from_port = 80 
    to_port = 80
  }
  resource "aws_network_acl_rule" "devonecloud_public_egerss80" {
    network_acl_id = aws_network_acl.devonecloud-public.id
    rule_number = 100
    rule_action = "allow"
    egress = true
    protocol = "tcp"
    cidr_block = "0.0.0.0/0"
    from_port = 80 
    to_port = 80
  }
  `

  res.status(200).json({ "file": b })
}