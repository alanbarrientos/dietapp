package com.example.springbootdieta.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="users")
public class User{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name="name")
    private String userName;
    @Column(name="email")
    private String email;
    @Column(name="password")
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name ="user_role",
            joinColumns = @JoinColumn(name="USER_ID", referencedColumnName = "ID"),
            inverseJoinColumns = @JoinColumn(name="ROLE_ID", referencedColumnName="ID"))
    private Set<Role> roles = new HashSet<>();

}


