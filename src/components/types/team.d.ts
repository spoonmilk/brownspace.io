export interface TeamProps {
    imageUrl: string;
    name: string;
    subgroup: string;
    position: string;
    socialNetworks: SocialNetworksProps[];
}
  
export interface SocialNetworksProps {
    name: string;
    url: string;
}
