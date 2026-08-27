<?php

namespace App\Domain\Entities;

class ProfileEntity
{

    public function __construct(
        private ?int $id,
        private string $nom,
        private string $prenom,
        private string $email,
    )
    {}

    public function getId(): int
    {
        return $this->id;
    }

    public function getNom(): string
    {
        return $this->nom;
    }

    public function getPrenom(): string
    {
        return $this->prenom;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

}