import { Tab } from "@headlessui/react";
import { useState } from "react";
import MyCombobox from "../Components/Combo";

const serviceProviders= ['AWS', 'GCP', 'Azure'];
const services=[{id: 1, name:"aws_instance"}, {id: 2, name:"aws_s3"}, {id: 3, name:"aws_alb"}]
const awsInstanceMap = {
  "AMI": <div>Hello</div>,
  "Availability zone": <div>av</div>,
  "CPU core count": <div>digit</div>,
  "Instance Type": <div>combo</div>,
  "Instance Name": <div>text</div>,
  "Tags": <div>text</div>
};
const regions = [
  { id: 1, name: "N. Virginia" },
  { id: 2, name: "Ohio" },
  { id: 3, name: "N. California" },
  { id: 4, name: "Oregon" },
  { id: 5, name: "GovCloud West" },
  { id: 6, name: "GovCloud East" },
  { id: 7, name: "Canada" },
  { id: 8, name: "Stockholm" },
  { id: 9, name: "Ireland" },
  { id: 10, name: "London" },
  { id: 11, name: "Paris" },
  { id: 12, name: "Frankfurt" },
  { id: 13, name: "Milan" },
  { id: 14, name: "Cape Town" },
  { id: 15, name: "Tokyo" },
  { id: 16, name: "Seoul" },
  { id: 17, name: "Osaka" },
  { id: 18, name: "Singapore" },
  { id: 19, name: "Sydney" },
  { id: 20, name: "Jakarta" },
  { id: 21, name: "Hong Kong" },
  { id: 22, name: "Mumbai" },
  { id: 23, name: "São Paulo" },
  { id: 24, name: "Bahrain" },
  { id: 25, name: "Beijing" },
  { id: 26, name: "Ningxia" },
];
const cores = [{id:1, name: "2"},{id:2, name: "4"},{id:3, name: "8"},{id:4, name: "16"}]

const zones = [{id: 1,name: "us-east-1a"},
              {id: 2,name: "us-east-1b"},
              {id: 3,name: "us-east-1c"},
              {id: 4,name: "us-east-1d"},
              {id: 5,name: "us-east-1e"},
              {id: 6,name: "us-east-1f"}]

const instances = [
  {
    "id": 1,
    "name": "c5d.2xlarge"
  },
  {
    "id": 2,
    "name": "c5d.xlarge"
  },
  {
    "id": 3,
    "name": "m6a.24xlarge"
  },
  {
    "id": 4,
    "name": "m5dn.xlarge"
  },
  {
    "id": 5,
    "name": "c5.metal"
  },
  {
    "id": 6,
    "name": "c6a.8xlarge"
  },
  {
    "id": 7,
    "name": "d3en.12xlarge"
  },
  {
    "id": 8,
    "name": "d3en.8xlarge"
  },
  {
    "id": 9,
    "name": "r5ad.16xlarge"
  },
  {
    "id": 10,
    "name": "m5a.2xlarge"
  },
  {
    "id": 11,
    "name": "m5n.metal"
  },
  {
    "id": 12,
    "name": "c6id.8xlarge"
  },
  {
    "id": 13,
    "name": "m5ad.2xlarge"
  },
  {
    "id": 14,
    "name": "m6id.xlarge"
  },
  {
    "id": 15,
    "name": "c6i.32xlarge"
  },
  {
    "id": 16,
    "name": "r5b.xlarge"
  },
  {
    "id": 17,
    "name": "r5n.12xlarge"
  },
  {
    "id": 18,
    "name": "i2.2xlarge"
  },
  {
    "id": 19,
    "name": "c5.9xlarge"
  },
  {
    "id": 20,
    "name": "r5ad.xlarge"
  },
  {
    "id": 21,
    "name": "r5.metal"
  },
  {
    "id": 22,
    "name": "m5.24xlarge"
  },
  {
    "id": 23,
    "name": "m5d.24xlarge"
  },
  {
    "id": 24,
    "name": "r5n.xlarge"
  },
  {
    "id": 25,
    "name": "x2idn.32xlarge"
  },
  {
    "id": 26,
    "name": "i3en.12xlarge"
  },
  {
    "id": 27,
    "name": "i4i.large"
  },
  {
    "id": 28,
    "name": "i3en.metal"
  },
  {
    "id": 29,
    "name": "m5zn.3xlarge"
  },
  {
    "id": 30,
    "name": "m5d.12xlarge"
  },
  {
    "id": 31,
    "name": "c5ad.xlarge"
  },
  {
    "id": 32,
    "name": "u-9tb1.112xlarge"
  },
  {
    "id": 33,
    "name": "x2iezn.12xlarge"
  },
  {
    "id": 34,
    "name": "m6id.32xlarge"
  },
  {
    "id": 35,
    "name": "c5.large"
  },
  {
    "id": 36,
    "name": "r5dn.xlarge"
  },
  {
    "id": 37,
    "name": "m6id.2xlarge"
  },
  {
    "id": 38,
    "name": "c6a.4xlarge"
  },
  {
    "id": 39,
    "name": "c5n.large"
  },
  {
    "id": 40,
    "name": "is4gen.8xlarge"
  },
  {
    "id": 41,
    "name": "m6id.4xlarge"
  },
  {
    "id": 42,
    "name": "x2iedn.2xlarge"
  },
  {
    "id": 43,
    "name": "c5.24xlarge"
  },
  {
    "id": 44,
    "name": "i2.xlarge"
  },
  {
    "id": 45,
    "name": "c5.12xlarge"
  },
  {
    "id": 46,
    "name": "i4i.32xlarge"
  },
  {
    "id": 47,
    "name": "m5n.16xlarge"
  },
  {
    "id": 48,
    "name": "t2.micro"
  },
  {
    "id": 49,
    "name": "d2.8xlarge"
  },
  {
    "id": 50,
    "name": "m6i.24xlarge"
  },
  {
    "id": 51,
    "name": "i3en.3xlarge"
  },
  {
    "id": 52,
    "name": "z1d.3xlarge"
  },
  {
    "id": 53,
    "name": "m5.2xlarge"
  },
  {
    "id": 54,
    "name": "inf1.xlarge"
  },
  {
    "id": 55,
    "name": "c5.18xlarge"
  },
  {
    "id": 56,
    "name": "c6id.2xlarge"
  },
  {
    "id": 57,
    "name": "x2iedn.32xlarge"
  },
  {
    "id": 58,
    "name": "r6gd.16xlarge"
  },
  {
    "id": 59,
    "name": "dl1.24xlarge"
  },
  {
    "id": 60,
    "name": "x1e.16xlarge"
  },
  {
    "id": 61,
    "name": "r5n.24xlarge"
  },
  {
    "id": 62,
    "name": "r5dn.metal"
  },
  {
    "id": 63,
    "name": "i2.8xlarge"
  },
  {
    "id": 64,
    "name": "r5dn.8xlarge"
  },
  {
    "id": 65,
    "name": "r5a.8xlarge"
  },
  {
    "id": 66,
    "name": "i4i.16xlarge"
  },
  {
    "id": 67,
    "name": "r6i.large"
  },
  {
    "id": 68,
    "name": "m6a.4xlarge"
  },
  {
    "id": 69,
    "name": "r6g.medium"
  },
  {
    "id": 70,
    "name": "c6i.24xlarge"
  },
  {
    "id": 71,
    "name": "c6id.32xlarge"
  },
  {
    "id": 72,
    "name": "r6id.12xlarge"
  },
  {
    "id": 73,
    "name": "m6i.large"
  },
  {
    "id": 74,
    "name": "r6g.12xlarge"
  }
]      

export function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  
// export interface comboProps {
//     id: number,
//     name: string
// }

// export interface awsProps {
//     serviceProviders: string[],
//     awsServices: comboProps[],
//     kweryRegion:
//     setKweryRegion:
//     regions:
//     selectedRegion:
//     setSelectedRegion:

// }

export const AWSForm = ({handledesc}: any) => {
    const [selectedRegion, setSelectedRegion] = useState(regions[0])
  const [kweryRegion, setKweryRegion] = useState('')
  
  const [selectedService, setSelectedService] = useState(services[0])
  const [kweryService, setKweryService] = useState('')

  const [selectedCores, setSelectedCores] = useState(cores[0])
  const [kweryCores, setKweryCores] = useState('')

  const [selectedZone, setSelectedZone] = useState(zones[0])
  const [kweryZone, setKweryZone] = useState('')

  const [selectedInstance, setSelectedInstance] = useState(instances[0])
  const [kweryInstance, setKweryInstance] = useState('')
  
  let [awsServices] = useState({
    aws_instance: [
      {
        id: 1,
        title: "Is tech making coffee better or worse?",
        date: "Jan 7",
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: "2h ago",
        commentCount: 3,
        shareCount: 2,
      },
    ],
    aws_s3: [
      {
        id: 1,
        title: "Is tech making coffee better or worse?",
        date: "Jan 7",
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: "The most innovative things happening in coffee",
        date: "Mar 19",
        commentCount: 24,
        shareCount: 12,
      },
    ],
    aws_alb: [
      {
        id: 1,
        title: "Ask Me Anything: 10 answers to your questions about coffee",
        date: "2d ago",
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: "4d ago",
        commentCount: 1,
        shareCount: 2,
      },
    ],
  });

    return(
        
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {serviceProviders.map((service, idx) => (
            <Tab
              key={idx}
              className={({ selected }) => classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {service}
            </Tab>
          ))}
        </Tab.List>
        
        <Tab.Panels className="mt-2 ">
          {Object.values(awsServices).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                "rounded-xl bg-white p-3",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              )}>

              <form key={idx} action="/api/hello" method="post">
                <div  className="mb-5 flex justify-between ">
                <div className="mb-5 relative">
                  
                  <label
                    htmlFor="name"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Region
                  </label>
                  <MyCombobox handledesc={handledesc} name={regions[0].name} kwery={kweryRegion} setKwery ={setKweryRegion} options={regions} selectedOption={selectedRegion} setSelectedOption={setSelectedRegion}/>
                </div>

                <div className="mb-5 ">
                  
                  <label
                    htmlFor="name"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Services
                  </label>
                  <MyCombobox handledesc={handledesc} name={services[0].name} kwery={kweryService} setKwery ={setKweryService} options={services} selectedOption={selectedService} setSelectedOption={setSelectedService}/>
                </div>

                <div className="mb-5 ">
                  
                  <label
                    htmlFor="name"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Cores count
                  </label>
                  <MyCombobox  handledesc={handledesc}name={cores[0].name} kwery={kweryCores} setKwery ={setKweryCores} options={cores} selectedOption={selectedCores} setSelectedOption={setSelectedCores}/>
                </div>
                

                <div className="mb-5 ">
                  
                  <label
                    htmlFor="name"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Availability Zones
                  </label>
                  <MyCombobox handledesc={handledesc} name={zones[0].name} kwery={kweryZone} setKwery ={setKweryZone} options={zones} selectedOption={selectedZone} setSelectedOption={setSelectedZone}/>
                </div>

                <div className="mb-5 ">
                  
                  <label
                    htmlFor="name"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                   Instance Type
                  </label>
                  <MyCombobox handledesc={handledesc} name={instances[0].name} kwery={kweryInstance} setKwery ={setKweryInstance} options={instances} selectedOption={selectedInstance} setSelectedOption={setSelectedInstance}/>
                </div>

               
                </div>
                <div className="mb-5">
                  
                  <label
                    htmlFor="name"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Instance Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Instance Name"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    name="kutta"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Instance Tag
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Instance tag"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div>
                  <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
                    Submit
                  </button>
                </div>
              </form>

              {/* <ul>
                                {posts.map((post) => (
                                    <li
                                        key={post.id}
                                        className="relative rounded-md p-3 hover:bg-gray-100"
                                    >
                                        <h3 className="text-sm font-medium leading-5">
                                            {post.title}
                                        </h3>

                                        <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                                            <li>{post.date}</li>
                                            <li>&middot;</li>
                                            <li>{post.commentCount} comments</li>
                                            <li>&middot;</li>
                                            <li>{post.shareCount} shares</li>
                                        </ul>

                                        <a
                                            href="#"
                                            className={classNames(
                                                'absolute inset-0 rounded-md',
                                                'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2'
                                            )}
                                        />
                                    </li>
                                ))}
                            </ul> */}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    )
}