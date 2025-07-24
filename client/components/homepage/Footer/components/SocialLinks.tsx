import React from 'react'

function SocialLinks() {
  return (
    <div>
              <h4 className="font-semibold text-lg mb-4">Social</h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://github.com/AAROHSINHA/DoneFlow" target='blank' className="hover:underline" >
                    Github
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/aaroh-sinha-375a8a324/" target='blank' className="hover:underline" >
                    Linkedin
                  </a>
                </li>
                <li>
                  <a href="https://x.com/" target='blank' className="hover:underline" >
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
  )
}

export default SocialLinks
